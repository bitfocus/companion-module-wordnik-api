import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { StatusManager } from './status.js'
import { API_CALLS } from './enums.js'
import type { QueryParams } from './interfaces.js'
import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import PQueue from 'p-queue'
import { ZodError } from 'zod'
import { Wordnik } from './wordnik.js'

const API_PATH = '/v4'
const SERVER = 'https://api.wordnik.com'
const TIMEOUT = 2000
const HEADERS = { 'Content-Type': 'application/json' }

export class WordnikInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig // Setup in init()
	#client!: Axios
	#controller = new AbortController()
	#queue = new PQueue({ concurrency: 1, interval: 1000, intervalCap: 1 })
	public Wordnik = new Wordnik()
	public statusManager: StatusManager = new StatusManager(this)

	constructor(internal: unknown) {
		super(internal)
	}

	public async init(config: ModuleConfig): Promise<void> {
		this.config = config

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.configUpdated(config).catch(() => {})
	}
	// When module gets deleted
	public async destroy(): Promise<void> {
		this.log('debug', `destroy ${this.id}`)
		this.#queue.clear()
		this.#controller.abort('Destroying connection')
		this.statusManager.destroy()
	}

	public async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config
		this.statusManager.updateStatus(InstanceStatus.Connecting)
		this.setupClient()
		this.initalQueries().catch(() => {})
	}

	private setupClient(): Axios {
		this.#queue.clear()
		return (this.#client = axios.create({
			baseURL: `${SERVER}${API_PATH}`,
			timeout: TIMEOUT,
			headers: HEADERS,
		}))
	}

	async clientGet(path: API_CALLS | string, params: QueryParams): Promise<AxiosResponse<any, any> | void> {
		return await this.#queue.add(
			async () => {
				params.api_key = this.config.apiKey
				return await this.#client
					.get(path, { params: params, signal: this.#controller.signal })
					.then((response) => {
						this.statusManager.updateStatus(InstanceStatus.Ok)
						if (this.config.verbose) console.log(response)
						return response
					})
					.catch((error) => this.handleError(error))
			},
			{ priority: 1 },
		)
	}

	//eslint-disable-next-line
	public handleError(err: any): void {
		if (err instanceof AxiosError) {
			this.statusManager.updateStatus(InstanceStatus.ConnectionFailure, err.code)
			if (this.config.verbose) {
				this.log('error', JSON.stringify(err))
			} else {
				this.log('error', err.code ?? err.message)
			}
		} else if (err instanceof ZodError) {
			this.statusManager.updateStatus(InstanceStatus.UnknownWarning, err.issues[0].message)
			if (this.config.verbose) {
				this.log('warn', JSON.stringify(err))
			} else {
				this.log('warn', err.issues[0].message)
			}
		} else {
			this.statusManager.updateStatus(InstanceStatus.UnknownError)
			this.log('debug', `Unknown error: ${err.toString()}`)
		}
	}

	async initalQueries(): Promise<void> {
		try {
			this.Wordnik.randomWord = (await this.clientGet(API_CALLS.RandomWord, {}))?.data
			this.Wordnik.randomWords = (await this.clientGet(API_CALLS.RandomWords, {}))?.data
			this.Wordnik.wotd = (await this.clientGet(API_CALLS.WordOfTheDay, {}))?.data
			this.updateVariableDefinitions()
		} catch (err) {
			this.handleError(err)
		}
	}

	// Return config fields for web config
	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(WordnikInstance, UpgradeScripts)

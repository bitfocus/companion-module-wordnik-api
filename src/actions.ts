import { CompanionActionDefinition, InstanceStatus } from '@companion-module/base'
import type { WordnikInstance } from './main.js'
import { API_CALLS } from './enums.js'

export enum ActionId {
	Wotd = 'get_wotd',
	RandomWord = 'random_word',
	RandomWords = 'random_words',
}

export function UpdateActions(self: WordnikInstance): void {
	const actions: { [id in ActionId]: CompanionActionDefinition } = {
		[ActionId.Wotd]: {
			name: 'Word of the day',
			options: [],
			callback: async (_action, _context) => {
				try {
					const response = await self.clientGet(API_CALLS.WordOfTheDay, {})
					self.Wordnik.wotd = response?.data
					self.log('debug', JSON.stringify(self.Wordnik.wotd))
					self.updateVariableDefinitions()
					self.statusManager.updateStatus(InstanceStatus.Ok)
				} catch (err) {
					self.handleError(err)
				}
			},
		},
		[ActionId.RandomWord]: {
			name: 'Random Word',
			options: [],
			callback: async (_action, _context) => {
				try {
					const response = await self.clientGet(API_CALLS.RandomWord, {})
					self.Wordnik.randomWord = response?.data
					self.log('debug', JSON.stringify(self.Wordnik.randomWord))
					self.updateVariableDefinitions()
					self.statusManager.updateStatus(InstanceStatus.Ok)
				} catch (err) {
					self.handleError(err)
				}
			},
		},
		[ActionId.RandomWords]: {
			name: 'Random Words',
			options: [],
			callback: async (_action, _context) => {
				try {
					const response = await self.clientGet(API_CALLS.RandomWords, {})
					self.Wordnik.randomWords = response?.data
					self.log('debug', JSON.stringify(self.Wordnik.randomWords))
					self.updateVariableDefinitions()
					self.statusManager.updateStatus(InstanceStatus.Ok)
				} catch (err) {
					self.handleError(err)
				}
			},
		},
	}
	self.setActionDefinitions(actions)
}

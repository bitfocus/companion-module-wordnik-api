import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	apiKey: string
	verbose: boolean
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'apiKey',
			label: 'API Key',
			width: 8,
			regex: Regex.SOMETHING,
		},
		{
			type: 'checkbox',
			id: 'verbose',
			label: 'Verbose Logs',
			width: 8,
			default: false,
		},
	]
}

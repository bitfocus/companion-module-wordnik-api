import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import type { WordnikInstance } from './main.js'
import { flatten } from 'flat'

export const sanitiseVariableId = (id: string, substitute: '' | '.' | '-' | '_' = '_'): string =>
	id.replaceAll(/[^a-zA-Z0-9-_.]/gm, substitute)

export function UpdateVariableDefinitions(self: WordnikInstance): void {
	try {
		const flatWotd = flatten(self.Wordnik.wotd)
		const flatRandomWord = flatten(self.Wordnik.randomWord)
		const flatRandomWords = flatten(self.Wordnik.randomWords)
		const varDefs: CompanionVariableDefinition[] = []
		const varValues: CompanionVariableValues = {}
		for (const [key, value] of Object.entries(flatWotd as object)) {
			const safeKey = sanitiseVariableId(key)
			varDefs.push({ variableId: `wotd_${safeKey}`, name: `Word Of The Day: ${key}` })
			varValues[`wotd_${safeKey}`] = value
		}
		for (const [key, value] of Object.entries(flatRandomWord as object)) {
			const safeKey = sanitiseVariableId(key)
			varDefs.push({ variableId: `randomWord_${safeKey}`, name: `Random Word: ${key}` })
			varValues[`randomWord_${safeKey}`] = value
		}
		for (const [key, value] of Object.entries(flatRandomWords as object)) {
			const safeKey = sanitiseVariableId(key)
			varDefs.push({ variableId: `randomWords_${safeKey}`, name: `Random Words: ${key}` })
			varValues[`randomWords_${safeKey}`] = value
		}
		self.setVariableDefinitions(varDefs)
		self.setVariableValues(varValues)
	} catch (err) {
		self.handleError(err)
	}
}

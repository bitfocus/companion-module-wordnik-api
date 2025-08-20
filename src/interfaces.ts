export interface Params {
	api_key?: string
}

export interface RandomWordParams extends Params {
	hasDictionaryDef?: string
	includePartOfSpeech?: string
	excludePartOfSpeech?: string
	minCorpusCount?: number
	maxCorpusCount?: number
	minDictionaryCount?: number
	maxDictionaryCount?: number
	minLength?: number
	maxLength?: number
}

export interface RandomWordsParams extends RandomWordParams {
	sortBy?: string
	sortOrder?: string
	limit?: number
}

export interface ReverseDictionaryParams extends Params {
	query: string
	findSenseForWord?: string
	includeSourceDictionaries?: string //should be enum
	excludeSourceDictionaries?: string
	includePartOfSpeech?: string
	excludePartOfSpeech?: string
	minCorpusCount?: number
	maxCorpusCount?: number
	minLength?: number
	maxLength?: number
	expandTerms?: string
	includeTags?: string //bool
	sortBy?: string //should be enum
	sortOrder?: string //should be enum
	skip?: string
	limit?: number
}

export interface SearchParams extends Params {
	allowRegex?: string
	caseSensitive?: string
	includePartOfSpeech?: string
	excludePartOfSpeech?: string
	minCorpusCount?: number
	maxCorpusCount?: number
	minDictionaryCount?: number
	maxDictionaryCount?: number
	minLength?: number
	maxLength?: number
	skip?: string
	limit?: number
}

export interface WordOfTheDayParams extends Params {
	date?: string
}

export type QueryParams =
	| RandomWordParams
	| RandomWordsParams
	| ReverseDictionaryParams
	| SearchParams
	| WordOfTheDayParams

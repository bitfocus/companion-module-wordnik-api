export enum API_CALLS {
	RandomWord = '/words.json/randomWord',
	RandomWords = '/words.json/randomWords',
	ReverseDictionary = '/words.json/reverseDictionary',
	Search = '/words.json/search/',
	WordOfTheDay = '/words.json/wordOfTheDay',
}

export enum WORD_API_CALLS {
	Audio = '/audio',
	Definitions = '/definitions',
	Etymologies = '/etymologies',
	Examples = '/examples',
	Frequency = '/frequency',
	Hyphenation = '/hyphenation',
	Phrases = '/phrases',
	Pronunciations = '/pronunciations',
	RelatedWords = '/relatedWords',
	ScrabbleScore = '/scrabbleScore',
	TopExample = '/topExample',
}

export const WordApiCall = (word: string, apicall: WORD_API_CALLS): string => {
	return `/word.json/${word}${apicall}`
}

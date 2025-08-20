import { RandomWord, RandomWords, WordOfTheDay } from './schemas.js'

export class Wordnik {
	#RandomWord!: RandomWord
	#RandomWords!: RandomWords
	#wotd!: WordOfTheDay

	constructor() {}

	// eslint-disable-next-line
	set randomWord(data: any) {
		this.#RandomWord = RandomWord.parse(data)
	}

	get randomWord(): RandomWord | undefined {
		return this.#RandomWord
	}

	// eslint-disable-next-line
	set randomWords(data: any) {
		this.#RandomWords = RandomWords.parse(data)
	}

	get randomWords(): RandomWords | undefined {
		return this.#RandomWords
	}

	// eslint-disable-next-line
	set wotd(data: any) {
		this.#wotd = WordOfTheDay.parse(data)
	}

	get wotd(): WordOfTheDay | undefined {
		return this.#wotd
	}
}

import { z } from 'zod'

export const RandomWord = z.object({
	canonicalForm: z.string().nullish(),
	id: z.int(),
	originalWord: z.string().nullish(),
	suggestions: z.array(z.string()).nullish(),
	vulgar: z.string().nullish(),
	word: z.string().nullish(),
})

export type RandomWord = z.infer<typeof RandomWord>

export const RandomWords = z.array(RandomWord)

export type RandomWords = z.infer<typeof RandomWords>

export const ReverseDictionary = z.object({
	results: z.array(RandomWord.nullish()).nullish(),
	totalResults: z.int().min(0).nullish(),
})

export type ReverseDictionary = z.infer<typeof ReverseDictionary>

export const Search = ReverseDictionary

export type Search = ReverseDictionary

export const WordOfTheDay = z.object({
	category: z.string().nullish(),
	contentProvider: z
		.object({
			id: z.int().min(0).nullish(),
			name: z.string().nullish(),
		})
		.nullish(),
	createdAt: z.string().nullish(),
	createdBy: z.string().nullish(),
	definitions: z
		.array(
			z
				.object({
					source: z.string().nullish(),
					text: z.string().nullish(),
					note: z.string().nullish(),
					partOfSpeech: z.string().nullish(),
				})
				.nullish(),
		)
		.nullish(),
	examples: z
		.array(
			z
				.object({
					url: z.string().nullish(),
					title: z.string().nullish(),
					text: z.string().nullish(),
					id: z.int().min(0),
				})
				.nullish(),
		)
		.nullish(),
	htmlExtra: z.string().nullish(),
	id: z.int().nullish(),
	_id: z.string().nullish(),
	note: z.string().nullish(),
	parentId: z.string().nullish(),
	publishDate: z.string().nullish(),
	pdd: z.string().nullish(),
	word: z.string().nullish(),
})

export type WordOfTheDay = z.infer<typeof WordOfTheDay>

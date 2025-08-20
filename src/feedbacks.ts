import { CompanionFeedbackDefinitions } from '@companion-module/base'
import type { WordnikInstance } from './main.js'

export function UpdateFeedbacks(self: WordnikInstance): void {
	const feedbacks: CompanionFeedbackDefinitions = {}
	self.setFeedbackDefinitions(feedbacks)
}

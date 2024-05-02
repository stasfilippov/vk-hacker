import axios from 'axios';

export const instance = axios.create({
	baseURL: 'https://hacker-news.firebaseio.com/v0/'
})
export const hackerNewsAPI = {
	getNewStoriesIds() {
		return instance.get('newstories.json').then(({data}) => data.slice(0, 100))
	},
	getStory(storyId: number) {
		return instance.get<StoryType>(`item/${storyId}.json`).then(({data}) => data)
	},
	getCommentById(commentId: number) {
		return instance.get(`item/${commentId}.json`).then(({data}) => data)
	}

}

export type StoryType = {
	by: string
	descendants: number
	id: number
	score: number
	time: number
	title: string
	type: 'story' | 'job' | 'comment' | 'poll' | 'pollopt'
	url: string
	kids: number[]
}

export type CommentType = {
	by: string
	id: number
	kids?: number[]
	parent: number
	text: string
	time: number,
	type: "comment"
}
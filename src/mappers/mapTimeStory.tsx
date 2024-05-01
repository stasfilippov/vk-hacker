export const mapTimeStory = (time: number) => {
	const seconds = Math.floor((Number(new Date()) - time * 1000) / 1000)

	let interval = Math.floor(seconds / 31536000)

	if (interval > 1) {
		return `${interval} years`
	}
	interval = Math.floor(seconds / 259200)
	if (interval > 1) {
		return `${interval} month`
	}
	interval = Math.floor(seconds / 86400)

	if (interval > 1) {
		return `${interval} days`
	}
	interval = Math.floor(seconds / 3600)

	if (interval > 1) {
		return `${interval} hours`
	}
	interval = Math.floor(seconds / 60)

	if (interval > 1) {
		return `${interval} minutes`
	}
	return `${Math.floor(seconds)} seconds`

}
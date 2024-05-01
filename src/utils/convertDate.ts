export const convertDate = (date: number | undefined) => {
	if (date) {
		return new Date(date * 1000).toLocaleString()
	}
}
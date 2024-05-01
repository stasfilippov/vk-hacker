// export const debounce = (func: Function, wait: number, immediate?: unknown, args?: unknown) => {
// 	let timeout: number | null;
//
// 	return () => {
// 		const context = this;
// 		const callNow = immediate && !timeout
// 		const later = () => {
// 			timeout = null;
// 			if (!immediate) func.apply(context, args)
// 		}
//
// 		clearTimeout(timeout)
// 		timeout = setTimeout(later, wait)
//
// 		if (callNow) func.apply(context, args)
// 	}
// }

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
	let timeout: number

	return (...args: Parameters<F>): Promise<ReturnType<F>> =>
		new Promise(resolve => {
			if (timeout) {
				clearTimeout(timeout)
			}

			timeout = setTimeout(() => resolve(func(...args)), waitFor)
		})
}
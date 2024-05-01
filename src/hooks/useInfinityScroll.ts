import {useEffect, useState} from 'react';
import {debounce} from '../utils/debounce.ts';

const MAX_STORIES = 100
const STORY_INCREMENT = 30


export const useInfiniteScroll = () => {
	const [loading, setLoading] = useState(false)
	const [count, setCount] = useState(STORY_INCREMENT)

	const handleScroll = debounce(() => {
		console.log('scroll')
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
			return false
		}

		setLoading(true)
	}, 100)

	useEffect(() => {
		if (!loading) return;

		if (count + STORY_INCREMENT >= MAX_STORIES) {
			setCount(MAX_STORIES)
		} else {
			setCount(count + STORY_INCREMENT)
		}
		setLoading(false)
	}, [loading])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, []);

	return {count}

}
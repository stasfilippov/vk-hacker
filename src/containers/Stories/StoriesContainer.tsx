import {FC, useEffect, useState} from 'react';
import {hackerNewsAPI} from '../../api/hackerNewsAPI.ts';
import {StoryComponent} from '../Story/StoryComponent.tsx';

export const StoriesContainer: FC = () => {

	const [storyIds, setStoryIds] = useState([])


	useEffect(() => {
		hackerNewsAPI.getNewStoriesIds().then(data => setStoryIds(data))
	}, []);

	return storyIds.map(storyId => {
		return (
			<StoryComponent key={storyId} idStory={storyId}/>
		)
	})
};


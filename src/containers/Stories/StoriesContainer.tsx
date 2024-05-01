import {FC, ReactNode, useEffect, useState} from 'react';
import {hackerNewsAPI} from '../../api/hackerNewsAPI.ts';
import {ScreenSpinner, SplitCol, SplitLayout} from '@vkontakte/vkui';
import {useInfiniteScroll} from '../../hooks/useInfinityScroll.ts';
import {StoryItemListContainer} from '../StoryItemListWrapper/StoryItemListContainer.tsx';

export const StoriesContainer: FC = () => {
	const {count} = useInfiniteScroll()
	const [storyIds, setStoryIds] = useState([])
	const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large"/>);


	useEffect(() => {
		console.log(
			'count', {count}
		)

		async function fetchStoriesData() {
			const res = await hackerNewsAPI.getNewStoriesIds()
			setStoryIds(res)
			setPopout(null);
		}

		fetchStoriesData()
	}, [count]);

	return (
		<SplitLayout popout={popout}>
			<SplitCol>
				{storyIds.slice(0, count).map(storyId => {
					return (
						<StoryItemListContainer key={storyId} idStory={storyId}/>
					)
				})}
			</SplitCol>
		</SplitLayout>
	)
};


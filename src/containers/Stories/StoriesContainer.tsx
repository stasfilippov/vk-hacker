import {FC, ReactNode, useEffect, useState} from 'react';
import {ScreenSpinner, SplitCol, SplitLayout} from '@vkontakte/vkui';
import {useInfiniteScroll} from '../../hooks/useInfinityScroll.ts';
import {StoryItemListContainer} from '../StoryItemListWrapper/StoryItemListContainer.tsx';
import {useAppDispatch} from '../../app/store.ts';
import {fetchStoriesIds} from './storiesIDs-slice.ts';
import {useSelector} from 'react-redux';
import {storyIdsSelector} from './storyIds-selector.ts';

export const StoriesContainer: FC = () => {
	const {count} = useInfiniteScroll()
	const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large"/>);
	const [isDataFetched, setIsDataFetched] = useState(false)
	const dispatch = useAppDispatch()
	const storyIds = useSelector(storyIdsSelector)

	const refreshFetchingData = () => {
		dispatch(fetchStoriesIds()).then(() => setIsDataFetched(true))
	}

	useEffect(() => {
		if (!isDataFetched) {
			refreshFetchingData()
			setPopout(null);
		}
	}, [isDataFetched]);

	useEffect(() => {
		if (isDataFetched) {
			const intervalId = setInterval(refreshFetchingData
			, 60000)

			return () => clearInterval(intervalId)
		}
	}, [isDataFetched])


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


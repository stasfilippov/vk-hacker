import {FC, ReactNode, useEffect, useState} from 'react';
import {ScreenSpinner, SplitCol, SplitLayout} from '@vkontakte/vkui';
import {StoryItemListContainer} from '../StoryItemListWrapper/StoryItemListContainer.tsx';
import {useAppDispatch} from '../../app/store.ts';
import {fetchStoriesIds} from './storiesIDs-slice.ts';
import {useSelector} from 'react-redux';
import {storyIdsSelector} from './storyIds-selector.ts';
import {useInView} from 'react-intersection-observer';

const MAX_STORIES = 100
const STORY_INCREMENT = 30
export const StoriesContainer: FC = () => {
	const [count, setCount] = useState(0)
	const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large"/>);
	const [isDataFetched, setIsDataFetched] = useState(false)
	const { ref, inView} = useInView();

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

	useEffect( () => {
		if (inView) {
			if (count + STORY_INCREMENT >= MAX_STORIES) {
				setCount(MAX_STORIES)
			} else {
				setCount(count + STORY_INCREMENT)
			}
		}
	}, [inView])

	return (
		<SplitLayout popout={popout}>
			<SplitCol>
				{storyIds.slice(0, count).map(storyId => {
					return (
						<StoryItemListContainer key={storyId} idStory={storyId}/>
					)
				})}
				<span ref={ref}>completed</span>
			</SplitCol>
		</SplitLayout>
	)
};


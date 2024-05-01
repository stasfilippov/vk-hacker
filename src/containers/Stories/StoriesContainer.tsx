import {FC, Fragment, ReactNode, useEffect, useState} from 'react';
import {hackerNewsAPI} from '../../api/hackerNewsAPI.ts';
import {StoryItemList} from '../Story/StoryItemList.tsx';
import {ScreenSpinner, Separator, Spacing, SplitCol, SplitLayout} from '@vkontakte/vkui';

export const StoriesContainer: FC = () => {

	const [storyIds, setStoryIds] = useState([])
	const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large"/>);


	useEffect(() => {
		async function fetchStoriesData() {
			const res = await hackerNewsAPI.getNewStoriesIds()
			setStoryIds(res)
			setPopout(null);
		}

		fetchStoriesData()
	}, []);

	return (
		<SplitLayout popout={popout}>
			<SplitCol>
				{storyIds.map(storyId => {
					return (
						<Fragment key={storyId}>
							<StoryItemList idStory={storyId}/>
							<Spacing size={24}>
								<Separator/>
							</Spacing>
						</Fragment>
					)
				})}
			</SplitCol>
		</SplitLayout>
	)
};


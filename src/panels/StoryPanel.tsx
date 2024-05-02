import {FC, ReactNode, useEffect, useState} from 'react';
import {
	NavIdProps,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	ScreenSpinner,
	SplitCol,
	SplitLayout,
} from '@vkontakte/vkui';
import {useParams, useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import {Story} from '../components/Story/Story.tsx';
import {useSelector} from 'react-redux';
import {getStorySelector} from '../components/Story/getStory-selector.ts';
import {useAppDispatch} from '../app/store.ts';
import {fetchCurrentStory} from '../components/Story/story-slice.ts';


export const StoryPanel: FC<NavIdProps> = ({id}) => {
	const routeNavigator = useRouteNavigator();
	const dispatch = useAppDispatch()
	const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large"/>);

	const story = useSelector(getStorySelector)
	const params = useParams<'idStory'>()

	useEffect(() => {
		dispatch(fetchCurrentStory(Number(params?.idStory)))
		setPopout(null);
	}, []);




	return (
		<Panel id={id}>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()}/>}>
				Страница новости
			</PanelHeader>
			<SplitLayout popout={popout}>
				<SplitCol>
					<Story story={story}/>
				</SplitCol>
			</SplitLayout>
		</Panel>
	);
};

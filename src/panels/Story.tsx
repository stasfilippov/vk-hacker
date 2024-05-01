import {FC, ReactNode, useEffect, useState} from 'react';
import {
	Div,
	Footnote,
	Link,
	NavIdProps,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	ScreenSpinner,
	Spacing,
	SplitCol,
	SplitLayout,
	Title
} from '@vkontakte/vkui';
import {useParams, useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import {hackerNewsAPI, StoryType} from '../api/hackerNewsAPI.ts';
import {convertDate} from '../utils/convertDate.ts';


export const Story: FC<NavIdProps> = ({id}) => {
	const routeNavigator = useRouteNavigator();

	const [story, setStory] = useState<StoryType | null>(null)
	const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large"/>);
	const params = useParams<'idStory'>()


	useEffect(() => {

		async function fetchStoryData() {
			const res = await hackerNewsAPI.getStory(Number(params?.idStory))
			setStory(res)
			setPopout(null);
		}

		fetchStoryData()
	}, []);

	const dateOfStory = convertDate(story?.time)


	return (
		<Panel id={id}>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()}/>}>
				Страница новости
			</PanelHeader>
			<SplitLayout popout={popout}>
				<SplitCol>
					<Div>
						<Link href={story?.url}>{story?.url}</Link>
						<Spacing size={16}/>
						<Title level={'1'}>{story?.title}</Title>
						<Spacing size={16}/>
						<Footnote weight="1">
							Автор: {story?.by}
						</Footnote>
						<Spacing size={16}/>
						<div>{dateOfStory}</div>
						<div>{story?.descendants}</div>
						<div>Comments</div>
						<div>Кнопка для обновления комментариев</div>
					</Div>
				</SplitCol>
			</SplitLayout>
		</Panel>
	);
};

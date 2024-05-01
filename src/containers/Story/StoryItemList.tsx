import {FC, useEffect, useState} from 'react';
import {hackerNewsAPI, StoryType} from '../../api/hackerNewsAPI.ts';
import {Button, Div, Footnote, Title} from '@vkontakte/vkui';
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import {routes} from '../../routes.ts';
import {convertDate} from '../../utils/convertDate.ts';
// import {RouterLink} from '@vkontakte/vk-mini-apps-router';

type StoryComponentProps = {
	idStory: number
}
export const StoryItemList: FC<StoryComponentProps> = ({idStory}) => {

	const [story, setStory] = useState<StoryType | null>(null)
	const routeNavigator = useRouteNavigator();

	useEffect(() => {
		hackerNewsAPI.getStory(idStory).then(data => data && data.url && setStory(data))
	}, []);

	const dateOfStory = convertDate(story?.time)


	return story && story.url ? (
		<Div>
			<Title level={'1'}>{story?.title}</Title>
			<Footnote weight="1">
				<span style={{marginRight: '5px'}}>Автор: {story?.by}</span>
			</Footnote>
			<Footnote weight="2">
				<span style={{marginRight: '5px'}}>Rating: {story?.score}</span>
			</Footnote>
			<Footnote weight="2">
				<span>{dateOfStory}</span>
			</Footnote>
			<Button
				onClick={() => routeNavigator.push(routes.default_root.default_view.story, {idStory: idStory.toString()})}>Переход
				на страницу новости</Button>
		</Div>
	) : null;
};


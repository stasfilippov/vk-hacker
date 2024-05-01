import {FC, useEffect, useState} from 'react';
import {Link, NavIdProps, Panel, PanelHeader, PanelHeaderBack, Placeholder} from '@vkontakte/vkui';
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import {hackerNewsAPI, StoryType} from '../api/hackerNewsAPI.ts';

export interface StoryProps extends NavIdProps {
	idStory: number;
}

export const Story: FC<StoryProps> = ({id, idStory}) => {
	const routeNavigator = useRouteNavigator();

	const [story, setStory] = useState<StoryType | null>(null)

	useEffect(() => {
		hackerNewsAPI.getStory(idStory).then(data => setStory(data))
	}, [idStory]);

	const convertData = (date: number | undefined) => {
		if (date) {
			return new Date(date * 1000).toLocaleString()
		}

		return 'Data not found'
	}

	return (
		<Panel id={id}>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()}/>}>
				Story
			</PanelHeader>
			<Placeholder>
				<Link href={story?.url}>{story?.url}</Link>
				<div>{story?.title}</div>
				<div>{story?.by}</div>
				<div>{convertData(story?.time)}</div>
			</Placeholder>
		</Panel>
	);
};

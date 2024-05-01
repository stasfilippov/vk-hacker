import {FC, useEffect, useState} from 'react';
import {hackerNewsAPI, StoryType} from '../../api/hackerNewsAPI.ts';
import {Button, Div} from '@vkontakte/vkui';
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import {routes} from '../../routes.ts';
// import {RouterLink} from '@vkontakte/vk-mini-apps-router';

type StoryComponentProps = {
	idStory: number
}
export const StoryComponent: FC<StoryComponentProps> = ({idStory}) => {

	const [story, setStory] = useState<StoryType | null>(null)
	const routeNavigator = useRouteNavigator();

	// const [story, setStory] = useState<StoryType | null>(null)

	useEffect(() => {
		hackerNewsAPI.getStory(idStory).then(data => data && data.url && setStory(data))
	}, []);
	//
	// const convertData = (date: number | undefined) => {
	// 	if (date) {
	// 		return new Date(date * 1000).toLocaleString()
	// 	}
	//
	// 	return 'Data not found'
	// }

	return (
		<Div>
			I am story {JSON.stringify(story)}
			<Button
				onClick={() => routeNavigator.push(routes.default_root.default_view.story, {idStory: idStory.toString()})}>Переход
				на страницу новости</Button>
		</Div>
	);
};


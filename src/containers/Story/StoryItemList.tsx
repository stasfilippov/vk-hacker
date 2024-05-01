import {FC, useEffect, useState} from 'react';
import {hackerNewsAPI, StoryType} from '../../api/hackerNewsAPI.ts';
import {SimpleCell, Tappable, Title} from '@vkontakte/vkui';
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import {routes} from '../../routes.ts';
import {convertDate} from '../../utils/convertDate.ts';
import {Icon20CalendarOutline, Icon20StatisticsOutline, Icon20User} from '@vkontakte/icons';
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
		<Tappable
			onClick={() => routeNavigator.push(routes.default_root.default_view.story, {idStory: idStory.toString()})}
			style={{'padding': '10px 20px'}}
		>
			<Title level={'1'}>{story?.title}</Title>
			<SimpleCell
				expandable="auto"
				before={<Icon20User/>}
			>{story?.by}</SimpleCell>
			<SimpleCell
				expandable="auto"
				before={<Icon20StatisticsOutline/>}
			>{story?.score}</SimpleCell>
			<SimpleCell
				expandable="auto"
				before={<Icon20CalendarOutline/>}
			>{dateOfStory}</SimpleCell>
		</Tappable>
	) : null;
};


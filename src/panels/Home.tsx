import {FC} from 'react';
import {Avatar, Button, Cell, Group, Header, NavIdProps, Panel, PanelHeader,} from '@vkontakte/vkui';
import {UserInfo} from '@vkontakte/vk-bridge';
import {StoriesContainer} from '../containers/Stories/StoriesContainer.tsx';
import {useAppDispatch} from '../app/store.ts';
import {fetchStoriesIds} from '../containers/Stories/storiesIDs-slice.ts';

export interface HomeProps extends NavIdProps {
	fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({id, fetchedUser}) => {
	const {photo_200, city, first_name, last_name} = {...fetchedUser};
	const dispatch = useAppDispatch()
	// const routeNavigator = useRouteNavigator();

	const handlerOnClick = () => {
		dispatch(fetchStoriesIds())
	}

	return (
		<Panel id={id}>
			<PanelHeader>Главная страница</PanelHeader>
			{fetchedUser && (
				<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
					<Cell before={photo_200 && <Avatar src={photo_200}/>} subtitle={city?.title}>
						{`${first_name} ${last_name}`}
					</Cell>
				</Group>
			)}

			<Group header={<Header mode="secondary">New stories</Header>}>
				<Button size="m" onClick={handlerOnClick}>
					Обновить новости
				</Button>
				<StoriesContainer/>
			</Group>
		</Panel>
	);
};

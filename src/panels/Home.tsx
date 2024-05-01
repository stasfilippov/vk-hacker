import {FC} from 'react';
import {Avatar, Button, Cell, Div, Group, Header, NavIdProps, Panel, PanelHeader,} from '@vkontakte/vkui';
import {UserInfo} from '@vkontakte/vk-bridge';
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router';

export interface HomeProps extends NavIdProps {
	fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({id, fetchedUser}) => {
	const {photo_200, city, first_name, last_name} = {...fetchedUser};
	const routeNavigator = useRouteNavigator();

	return (
		<Panel id={id}>
			<PanelHeader>Главная</PanelHeader>
			{fetchedUser && (
				<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
					<Cell before={photo_200 && <Avatar src={photo_200}/>} subtitle={city?.title}>
						{`${first_name} ${last_name}`}
					</Cell>
				</Group>
			)}

			<Group header={<Header mode="secondary">New stories</Header>}>
				<Div>
					<Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('story')}>
						Перейти на страницу Story
					</Button>
				</Div>
			</Group>
		</Panel>
	);
};

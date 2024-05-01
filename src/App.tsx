import {ReactNode, useEffect, useState} from 'react';
import {UserInfo} from '@vkontakte/vk-bridge';
import {ScreenSpinner, SplitCol, SplitLayout, View} from '@vkontakte/vkui';
import {useActiveVkuiLocation} from '@vkontakte/vk-mini-apps-router';

import {Home, Story} from './panels';
import {DEFAULT_VIEW_PANELS} from './routes';

export const App = () => {
	const {panel: activePanel = DEFAULT_VIEW_PANELS.HOME} = useActiveVkuiLocation();
	const [fetchedUser, setUser] = useState<UserInfo | undefined>();
	const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large"/>);

	useEffect(() => {
		async function fetchData() {
			// const user = await bridge.send('VKWebAppGetUserInfo');
			// setUser(user);
			setPopout(null);
		}

		fetchData();
	}, []);

	return (
		<SplitLayout popout={popout}>
			<SplitCol>
				<View activePanel={activePanel}>
					<Home id="home" fetchedUser={fetchedUser}/>
					<Story id="story"/>
				</View>story/:idStory
			</SplitCol>
		</SplitLayout>
	);
};

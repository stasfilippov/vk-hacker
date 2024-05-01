import vkBridge, {parseURLSearchParamsForGetLaunchParams} from '@vkontakte/vk-bridge';
import {useAdaptivity, useAppearance, useInsets} from '@vkontakte/vk-bridge-react';
import {AdaptivityProvider, AppRoot, ConfigProvider} from '@vkontakte/vkui';
import {RouterProvider} from '@vkontakte/vk-mini-apps-router';
import '@vkontakte/vkui/dist/cssm/styles/themes.css';

import {transformVKBridgeAdaptivity} from './utils';
import {router} from './routes';
import {App} from './App';
import {store} from './app/store.ts';
import {Provider} from 'react-redux';

export const AppConfig = () => {
	const vkBridgeAppearance = useAppearance() || undefined;
	const vkBridgeInsets = useInsets() || undefined;
	const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
	const {vk_platform} = parseURLSearchParamsForGetLaunchParams(window.location.search);

	return (
		<ConfigProvider
			appearance={vkBridgeAppearance}
			platform={vk_platform === 'desktop_web' ? 'vkcom' : undefined}
			isWebView={vkBridge.isWebView()}
			hasCustomPanelHeaderAfter={true}
		>
			<AdaptivityProvider {...adaptivity}>
				<AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
					<RouterProvider router={router}>
						<Provider store={store}>
							<App/>
						</Provider>
					</RouterProvider>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
};

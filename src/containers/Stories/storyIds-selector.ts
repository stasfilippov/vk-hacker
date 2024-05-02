import {AppRootStateType} from '../../app/store.ts';

export const storyIdsSelector = (state: AppRootStateType) => state.storiesIds.storiesIds

export const getIsDataFetching = (state: AppRootStateType) => state.storiesIds.isDataFetched
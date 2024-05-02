import {AppRootStateType} from '../../app/store.ts';

export const getStorySelector = (state: AppRootStateType) => state.story.currentStory
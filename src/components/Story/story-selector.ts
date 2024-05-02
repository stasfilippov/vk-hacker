import {AppRootStateType} from '../../app/store.ts';

export const storySelector = (state: AppRootStateType) => state.story.currentStory
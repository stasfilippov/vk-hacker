import {AnyAction, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {appReducer} from './app-slice.ts';
import {storiesIdsReducer} from '../containers/Stories/storiesIDs-slice.ts';
import {useDispatch} from 'react-redux';
import {storyReducer} from '../components/Story/story-slice.ts';

const rootReducer = combineReducers({
	app: appReducer,
	storiesIds: storiesIdsReducer,
	story: storyReducer
});

export const store = configureStore({
	reducer: rootReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

// @ts-ignore
window.store = store;
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AppRootStateType} from '../app/store.ts';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootStateType;
	dispatch: AppDispatch;
	rejectValue: null;
}>();
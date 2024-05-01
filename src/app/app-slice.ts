import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
	error: null as string | null,
};

export type AppInitialStateType = typeof initialState;

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error;
		},
	},
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;


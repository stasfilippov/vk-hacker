import {createSlice} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from '../../utils/createAppAsyncThunk.ts';
import {hackerNewsAPI} from '../../api/hackerNewsAPI.ts';
import {handleServerNetworkError} from '../../utils/handleServerNetworkError.ts';

const initialState = {
	storiesIds: [] as number[]
};

export type StoriesIdsInitialStateType = typeof initialState;

const slice = createSlice({
	name: 'storiesIds',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchStoriesIds.fulfilled, (state, action) => {
				state.storiesIds = action.payload.storiesIds
			})
	}
});


export const fetchStoriesIds = createAppAsyncThunk<{
	storiesIds: number[];
}>(`${slice.name}/storiesIds`, async (arg, thunkAPI) => {
	const {dispatch, rejectWithValue} = thunkAPI;
	try {
		const res = await hackerNewsAPI.getNewStoriesIds();
		return {storiesIds: res};
	} catch (e) {
		handleServerNetworkError(e, dispatch);
		return rejectWithValue(null);
	}
});

export const storiesIdsReducer = slice.reducer;
export const storiesIdsActions = slice.actions;

export const storiesIdsThunks = {fetchStoriesIds};

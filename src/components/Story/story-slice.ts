import {createSlice} from '@reduxjs/toolkit';
import {hackerNewsAPI, StoryType} from '../../api/hackerNewsAPI.ts';
import {createAppAsyncThunk} from '../../utils/createAppAsyncThunk.ts';
import {handleServerNetworkError} from '../../utils/handleServerNetworkError.ts';

const initialState = {
	currentStory: {} as StoryType
};

export type StoryInitialStateType = typeof initialState;

const slice = createSlice({
	name: 'story',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCurrentStory.fulfilled, (state, action) => {
				state.currentStory = action.payload.story
			})
	}
});


export const fetchCurrentStory = createAppAsyncThunk<{
	story: StoryType;
},
number>(`${slice.name}/story`, async (storyId: number, thunkAPI) => {
	const {dispatch, rejectWithValue} = thunkAPI;
	try {
		const res = await hackerNewsAPI.getStory(storyId);
		return {story: res};
	} catch (e) {
		handleServerNetworkError(e, dispatch);
		return rejectWithValue(null);
	}
});

export const storyReducer = slice.reducer;
export const storyActions = slice.actions;

export const storyThunks = {fetchCurrentStory};

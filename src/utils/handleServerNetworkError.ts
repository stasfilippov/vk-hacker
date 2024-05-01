import axios from 'axios';
import {AppDispatch} from '../app/store.ts';
import {appActions} from '../app/app-slice.ts';

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch): void => {
	let errorMessage = 'Some error occurred';
	// ❗Проверка на наличие axios ошибки
	if (axios.isAxiosError(err)) {
		errorMessage = err.response?.data?.message || err?.message || errorMessage;
	} else if (err instanceof Error) {
		errorMessage = `Native error: ${err.message}`;
	} else {
		errorMessage = JSON.stringify(err);
	}

	dispatch(appActions.setAppError({error: errorMessage}));
};

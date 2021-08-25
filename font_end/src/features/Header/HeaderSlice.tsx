import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export const HeaderSlice = createSlice({
	name: 'HeaderSlice',
	initialState: location.pathname.substring(1),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		updateTitleHeader: (state, action: any) => {
			state = action.payload;

			return state;
		},
	},
});

export const { updateTitleHeader } = HeaderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const titleHeader = (state: RootState) => state.titleHeader;

export default HeaderSlice.reducer;

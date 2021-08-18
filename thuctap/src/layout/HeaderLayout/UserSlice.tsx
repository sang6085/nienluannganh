import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGetProfile } from '../../api/User';

export const userProfile: any = createAsyncThunk('/user/name', async () => {
	const currentName = await UserGetProfile();
	return currentName?.data?.name;
});
const UserSlice = createSlice({
	name: 'UserSlice',
	initialState: { name: 'User Name' },
	reducers: {
		updateNameUser(state, action: PayloadAction<any>) {
			state.name = action.payload;
		},
	},
	extraReducers: {
		[userProfile.pending]: (state) => {
			state.name = 'User Name';
		},
		[userProfile.rejected]: (state) => {
			state.name = 'User Name';
		},
		[userProfile.fulfilled]: (state, action) => {
			state.name = action.payload;
		},
	},
});

const { actions, reducer } = UserSlice;
export const { updateNameUser } = actions;
export default reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const handleChangeInit = (link: any) => {
	if (link.indexOf('/') !== -1) {
		return link.substring(0, link.indexOf('/'));
	} else {
		return link;
	}
};

const SideBarSlice = createSlice({
	name: 'SideBarSlice',
	initialState: { title: handleChangeInit(location.pathname.substring(1)) },
	reducers: {
		updateTitleHeader(state, action: PayloadAction<string>) {
			if (action.payload.indexOf('/') != -1) {
				state.title = action.payload.substring(0, action.payload.indexOf('/'));
			} else {
				state.title = action.payload;
			}
		},
	},
});
const { actions, reducer } = SideBarSlice;
export const { updateTitleHeader } = actions;
export default reducer;

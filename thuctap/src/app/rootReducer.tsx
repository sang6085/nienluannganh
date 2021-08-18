import counterSlice from '../features/counter/counterSlice';
import UserSlice from '../layout/HeaderLayout/UserSlice';
import SideBarSlice from '../layout/SideBarLayout/SideBarSlice';

export const rootReducer = {
	SideBar: SideBarSlice,
	counter: counterSlice,
	User: UserSlice,
};

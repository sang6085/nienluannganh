import { UserRegisterDto } from '../DTO/Register/UserRegisterDto';
import { RegisterResponse } from '../DTO/response/Register';
import { callApi } from './api';

export const RegisterPost = (user: UserRegisterDto): Promise<RegisterResponse | undefined> => {
	const response = callApi('POST', '/api/v1/Users/Register', user).then((res: RegisterResponse) => {
		return res;
	});

	return response;
};

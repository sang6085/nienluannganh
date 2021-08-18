import { UserLoginDto } from '../DTO/Login/UserLoginDTO';
import { BaseResponse } from '../DTO/response/BaseResponse';
import { JWTDto } from '../DTO/response/Login';
import { callApi } from './api';

export const LoginPost = (user: UserLoginDto): Promise<BaseResponse<JWTDto> | undefined> => {
	const response = callApi('POST', '/api/v1/Users/login', user).then(
		(res: BaseResponse<JWTDto>) => {
			return res;
		}
	);

	return response;
};

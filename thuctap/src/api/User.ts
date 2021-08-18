import { BaseResponse } from '../DTO/response/BaseResponse';
import { UserProfileDTO } from '../DTO/response/User';
import { callApi } from './api';

export const UserGetProfile = (): Promise<BaseResponse<UserProfileDTO> | undefined> => {
	const response = callApi('GET', '/api/v1/Users/profile').then(
		(res: BaseResponse<UserProfileDTO>) => {
			return res;
		}
	);

	return response;
};

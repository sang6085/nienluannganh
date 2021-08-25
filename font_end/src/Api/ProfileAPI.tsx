import { ProfileDTO } from '../DTO/Response/ProfileDTO';
import { ResultAPI } from '../DTO/Response/ResultAPI';
import { callApi } from './Api';

export const ProfileGet = (): Promise<ResultAPI<ProfileDTO> | undefined> => {
	const response = callApi('GET', '/api/v3/account/profile').then((res: ResultAPI<ProfileDTO>) => {
		return res;
	});
	return response;
};

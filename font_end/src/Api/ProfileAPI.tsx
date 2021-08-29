import { ProfileDTO } from '../DTO/Response/ProfileDTO';
import { ResultAPI } from '../DTO/Response/ResultAPI';
import { callApi } from './Api';

export const ProfileGet = () => {
	const response = callApi('GET', '/api/v3/account/profile').then((res) => {
		return res;
	});
	return response;
};

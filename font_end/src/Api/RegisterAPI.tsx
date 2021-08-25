import { ResultAPI } from '../DTO/Response/ResultAPI';
import { RegisterDTO } from '../DTO/Resquest/RegisterDTO';
import { callApi } from './Api';

export const RegisterPost = (user: RegisterDTO): Promise<ResultAPI<boolean> | undefined> => {
	const response = callApi('POST', '/api/v3/account/register', user, false).then(
		(res: ResultAPI<boolean>) => {
			return res;
		}
	);
	return response;
};

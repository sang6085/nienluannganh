import { JwtDTO } from '../DTO/Response/JwtDTO';
import { ResultAPI } from '../DTO/Response/ResultAPI';
import { LoginDTO } from '../DTO/Resquest/LoginDTO';
import { callApi } from './Api';

export const LoginPost = (user: LoginDTO): Promise<ResultAPI<JwtDTO> | undefined> => {
	const response = callApi('POST', '/api/v3/account/login', user, false).then(
		(res: ResultAPI<JwtDTO>) => {
			return res;
		}
	);
	return response;
};

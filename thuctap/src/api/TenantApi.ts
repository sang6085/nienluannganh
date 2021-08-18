import { BaseResponse } from '../DTO/response/BaseResponse';
import { BooleanAPIResult } from '../DTO/response/Document';
import { UserInTenantDTOAPIList } from '../DTO/response/Tenant';
import { GetTenantDTO, RegisterUserDTO } from '../DTO/Tenant/TenantDTO';
import { callApi } from './api';

export const RegisterInTenant = (
	params: RegisterUserDTO
): Promise<BaseResponse<BooleanAPIResult> | undefined> => {
	const response = callApi('POST', '/api/v1/Users/register_in_tenant', params).then(
		(res: BaseResponse<BooleanAPIResult>) => {
			return res;
		}
	);

	return response;
};

export const UserGet = (
	params: GetTenantDTO
): Promise<BaseResponse<UserInTenantDTOAPIList> | undefined> => {
	const response = callApi(
		'GET',
		`/api/v1/Users?Search=${params.Search}&Order=${params.Order}&Page=${params.Page}&PageSize=${params.PageSize}`
	).then((res: BaseResponse<UserInTenantDTOAPIList>) => {
		return res;
	});

	return response;
};

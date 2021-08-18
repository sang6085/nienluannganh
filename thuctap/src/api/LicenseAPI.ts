import { LicenseDTO } from '../DTO/LicenseDTO/LicenseDTO';
import { LicenseDTOGet } from '../DTO/LicenseDTO/LicenseDTOGet';
import { BaseResponse } from '../DTO/response/BaseResponse';
import { BooleanAPIResult } from '../DTO/response/Document';
import { LicenseDTOAPIList, LicenseDTOAPIResult } from '../DTO/response/License';
import { callApi } from './api';

export const LicensePost = (
	license: LicenseDTO
): Promise<LicenseDTOAPIResult<LicenseDTO> | undefined> => {
	const response = callApi('POST', '/api/v1/Licenses', license).then(
		(res: LicenseDTOAPIResult<LicenseDTO>) => {
			return res;
		}
	);
	return response;
};
export const LicenseGet = (
	params: LicenseDTOGet
): Promise<BaseResponse<LicenseDTOAPIList> | undefined> => {
	const response = callApi(
		'GET',
		`/api/v1/Licenses?Page=${params.Page}&Search=${params.Search}&PageSize=${params.PageSize}`
	).then((res: BaseResponse<LicenseDTOAPIList>) => {
		return res;
	});
	return response;
};
export const LicenseDelete = (
	idDelete: number
): Promise<BaseResponse<BooleanAPIResult> | undefined> => {
	const response = callApi('DELETE', '/api/v1/Licenses', idDelete).then(
		(res: BaseResponse<BooleanAPIResult>) => {
			return res;
		}
	);
	return response;
};

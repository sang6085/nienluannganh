import { callApi } from './Api';

export const LicenseGet = (params: any) => {
	const response = callApi(
		'GET',
		`/api/v3/license/select_list?page=${params.page}&pageSize=${params.pageSize}&search=${params.search}`
	).then((res) => {
		return res;
	});
	return response;
};
export const LicenseDelete = (id: string) => {
	const response = callApi('DELETE', `/api/v3/license/${id}`).then((res) => {
		return res;
	});
	return response;
};
export const LicenseGETId = (id: string) => {
	const response = callApi('GET', `/api/v3/license/${id}`).then((res) => {
		return res;
	});
	return response;
};
export const LicensePost = (data: any) => {
	const response = callApi('POST', '/api/v3/license', data).then((res) => {
		return res;
	});
	return response;
};
export const LicenseGetAll = () => {
	const response = callApi('GET', '/api/v3/license/get_all').then((res) => {
		return res;
	});
	return response;
};

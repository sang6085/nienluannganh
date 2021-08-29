import { callApi } from './Api';

export const UserGet = (params: any) => {
	const response = callApi(
		'GET',
		`/api/v3/account/select_list?page=${params.page}&pageSize=${params.pageSize}&search=${params.search}`
	).then((res) => {
		return res;
	});
	return response;
};
export const UserDelete = (id: string) => {
	const response = callApi('DELETE', `/api/v3/account/${id}`).then((res) => {
		return res;
	});
	return response;
};

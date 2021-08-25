import { callApi } from './Api';

export const FolderGet = (params: any) => {
	const response = callApi(
		'GET',
		`/api/v3/folder/select_list?parentId=${params.parentId}&page=${params.page}&pageSize=${params.pageSize}&search=${params.search}`
	).then((res) => {
		return res;
	});
	return response;
};
export const FolderPost = (data: any) => {
	const response = callApi('POST', '/api/v3/folder', data).then((res) => {
		return res;
	});
	return response;
};
export const FolderDelete = (id: string) => {
	const response = callApi('DELETE', `/api/v3/folder/${id}`).then((res) => {
		return res;
	});
	return response;
};

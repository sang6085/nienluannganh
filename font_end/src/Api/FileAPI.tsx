import { callApi } from './Api';

export const FilePost = (file: any, idFolder: any) => {
	const response = callApi('POST', `/api/v3/file?idFolder=${idFolder}`, file).then((res) => {
		return res;
	});
	return response;
};

export const FileGet = (params: any) => {
	const response = callApi(
		'GET',
		`/api/v3/file/select_list?parentId=${params.parentId}&page=${params.page}&pageSize=${params.pageSize}&search=${params.search}`
	).then((res) => {
		return res;
	});
	return response;
};
export const RenameFilePost = (data: any) => {
	const response = callApi('POST', '/api/v3/file/rename', data).then((res) => {
		return res;
	});
	return response;
};
export const FileDelete = (id: string) => {
	const response = callApi('DELETE', `/api/v3/file/${id}`).then((res) => {
		return res;
	});
	return response;
};

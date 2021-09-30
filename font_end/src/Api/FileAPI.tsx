import { callApi } from './Api';

export const FilePost = (file: any, data: any, onUploadProgress?: (progressEvent: any) => void) => {
	const response = callApi(
		'POST',
		`/api/v3/file?idFolder=${data.idFolder}&userId=${data.userId}`,
		file,
		true,
		false,
		onUploadProgress
	).then((res) => {
		return res;
	});
	return response;
};

export const FileGet = (params: any) => {
	const response = callApi(
		'GET',
		`/api/v3/file/select_list?parentId=${params.parentId}&page=${params.page}&pageSize=${params.pageSize}&search=${params.search}&userId=${params.userId}`
	).then((res) => {
		return res;
	});
	return response;
};
export const FileGetAll = (data: any) => {
	const response = callApi('POST', '/api/v3/file/get_all', data).then((res) => {
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
export const FileDelete = (data: any) => {
	const response = callApi('POST', '/api/v3/file/delete', data).then((res) => {
		return res;
	});
	return response;
};
export const DownloadGet = (data: any, onDownloadProgress?: (progressEvent: any) => void) => {
	const response = callApi(
		'POST',
		'/api/v3/file/download',
		data,
		true,
		true,
		undefined,
		onDownloadProgress
	).then((res) => {
		return res;
	});
	return response;
};

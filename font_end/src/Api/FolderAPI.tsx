import { callApi } from './Api';

export const FolderGet = (params: any) => {
	const response = callApi(
		'GET',
		`/api/v3/folder/select_list?parentId=${params.parentId}&page=${params.page}&pageSize=${params.pageSize}&search=${params.search}&userId=${params.userId}`
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
export const FolderDelete = (data: any) => {
	const response = callApi('POST', '/api/v3/folder/delete', data).then((res) => {
		return res;
	});
	return response;
};
export const TreeviewGet = (id: any) => {
	const response = callApi('GET', `/api/v3/folder/treeview/${id}`).then((res) => {
		return res;
	});
	return response;
};
export const UserIdGet = (folderId: any) => {
	const response = callApi('GET', `/api/v3/folder/getUserId?folderId=${folderId}`).then((res) => {
		return res;
	});
	return response;
};

export const ShareFolderPost = (data: any) => {
	const response = callApi('POST', `/api/v3/shared/document/`, data).then((res) => {
		return res;
	});
	return response;
};
export const ShareToGet = (idFolder: any) => {
	const response = callApi(
		'GET',
		`/api/v3/shared/document/shareTo/select_list?idFolder=${idFolder}`
	).then((res) => {
		return res;
	});
	return response;
};
export const ShareDeletePost = (data: any) => {
	const response = callApi('POST', '/api/v3/shared/document/delete', data).then((res) => {
		return res;
	});
	return response;
};
export const ShareGet = (name: any) => {
	const response = callApi('GET', `/api/v3/shared/document/select_list?name=${name}`).then(
		(res) => {
			return res;
		}
	);
	return response;
};

import axios, { Method } from 'axios';

export const callApi = (
	method: Method,
	uri: string,
	data?: any,
	isAuthen = true,
	resType = false,
	onUploadProgress?: (progressEvent: any) => void | undefined,
	onDownloadProgress?: (progressEvent: any) => void
) => {
	const token = window.localStorage.getItem('token');
	return axios({
		method: method,
		url: uri,
		data: data,

		headers: {
			Authorization: token && isAuthen && `Bearer ${token}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		responseType: resType ? 'blob' : 'json',
		onUploadProgress,
		onDownloadProgress,
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			if (err.response) {
				return err.response.data;
			}
		});
};

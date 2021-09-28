import { callApi } from './Api';

export const TenantGet = () => {
	const response = callApi('GET', '/api/v3/tenant').then((res) => {
		return res;
	});
	return response;
};
export const TenantPost = (data: any) => {
	const response = callApi('POST', '/api/v3/tenant', data).then((res) => {
		return res;
	});
	return response;
};
export const TenantBuy = (data: any) => {
	const response = callApi('POST', '/api/v3/tenant/post', data).then((res) => {
		return res;
	});
	return response;
};

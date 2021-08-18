import { BaseResponse } from '../DTO/response/BaseResponse';
import {
	CategoryResponsePost,
	SelectListDTOAPIResult,
	CategoryResponseDelete,
	CategoryResponseGetById,
	CategoryResponseGetBySelectList,
	CategoryResponseGet,
} from '../DTO/response/Category';
import { callApi } from './api';
import {
	CategoryByIdDTO,
	CategoryDTO,
	CategoryBySelectListDTO,
	CategoryGetDTO,
} from '../DTO/Category/CategoryDTO';
import { BaseData } from '../DTO/response/BaseData';

export const CategoyrGet = (): Promise<BaseResponse<SelectListDTOAPIResult> | undefined> => {
	const response = callApi('GET', '/api/v1/Categories/select_list').then(
		(res: BaseResponse<SelectListDTOAPIResult>) => {
			return res;
		}
	);

	return response;
};

export const CategoryGet = (
	category: CategoryGetDTO
): Promise<BaseResponse<BaseData<CategoryResponseGet[]>> | undefined> => {
	const response = callApi(
		'GET',
		`/api/v1/Categories/?Search=${category.Search}&Other=${category.Order}&Page=${category.Page}&PageSize=${category.PageSize}&Skip=${category.Skip}`
	).then((res: BaseResponse<BaseData<CategoryResponseGet[]>>) => {
		return res;
	});
	return response;
};

export const CategoryPost = (
	category: CategoryDTO
): Promise<BaseResponse<CategoryResponsePost> | undefined> => {
	const response = callApi('POST', '/api/v1/Categories', category).then(
		(res: BaseResponse<CategoryResponsePost>) => {
			return res;
		}
	);
	return response;
};

export const CategoryDelete = (
	category: CategoryByIdDTO
): Promise<BaseResponse<CategoryResponseDelete> | undefined> => {
	const response = callApi('DELETE', '/api/v1/Categories', category).then(
		(res: BaseResponse<CategoryResponseDelete>) => {
			return res;
		}
	);
	return response;
};

export const CategoryGetById = (
	category: CategoryByIdDTO
): Promise<BaseResponse<CategoryResponseGetById> | undefined> => {
	const response = callApi('GET', `/api/v1/Categories/${category}`).then(
		(res: BaseResponse<CategoryResponseGetById>) => {
			return res;
		}
	);
	return response;
};

export const CategoryGetBySelectList = (
	text: CategoryBySelectListDTO
): Promise<BaseResponse<CategoryResponseGetBySelectList> | undefined> => {
	const response = callApi('GET', `/api/v1/Categories/?text=${text}`).then(
		(res: BaseResponse<CategoryResponseGetBySelectList>) => {
			return res;
		}
	);
	return response;
};

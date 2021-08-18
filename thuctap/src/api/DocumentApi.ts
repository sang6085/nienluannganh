import { BaseResponse } from '../DTO/response/BaseResponse';
import { callApi } from './api';
import { FolderDTO } from '../DTO/Document/FolderDTO';
import {
	BooleanAPIResult,
	FolderDetailDTO,
	FolderDTOAPIListAPIResult,
	FolderDTOAPIResult,
} from '../DTO/response/Document';
import { FolderDTOGet } from '../DTO/Document/FolderDTOGet';
import { FavoriteFolderDTO } from '../DTO/Document/FavoriteFolderDTO';

export const DocumentPost = (
	document: FolderDTO
): Promise<BaseResponse<FolderDTOAPIResult> | undefined> => {
	const response = callApi('POST', '/api/v1/Folders', document).then(
		(res: BaseResponse<FolderDTOAPIResult>) => {
			return res;
		}
	);

	return response;
};

export const DocumentGet = (
	params: FolderDTOGet
): Promise<BaseResponse<FolderDTOAPIListAPIResult> | undefined> => {
	let uri: any = '';
	if (params.CategoryId) {
		uri = `/api/v1/Folders?CategoryId=${params.CategoryId}&Search=${params.Search}&Order=${params.Order}&Page=${params.Page}&PageSize=${params.PageSize}`;
	} else {
		uri = `/api/v1/Folders?Search=${params.Search}&Order=${params.Order}&Page=${params.Page}&PageSize=${params.PageSize}`;
	}
	const response = callApi('GET', uri).then((res: BaseResponse<FolderDTOAPIListAPIResult>) => {
		return res;
	});

	return response;
};

export const DocumentGetById = (
	params: number
): Promise<BaseResponse<FolderDetailDTO> | undefined> => {
	const response = callApi('GET', `/api/v1/Folders/${params}`).then(
		(res: BaseResponse<FolderDetailDTO>) => {
			return res;
		}
	);

	return response;
};

export const DocumentDelete = (
	params: number
): Promise<BaseResponse<BooleanAPIResult> | undefined> => {
	const response = callApi('DELETE', '/api/v1/Folders', params).then(
		(res: BaseResponse<BooleanAPIResult>) => {
			return res;
		}
	);

	return response;
};

export const DocumentFavorite = (
	params: FavoriteFolderDTO
): Promise<BaseResponse<BooleanAPIResult> | undefined> => {
	const response = callApi('POST', '/api/v1/Folders/favorite', params).then(
		(res: BaseResponse<BooleanAPIResult>) => {
			return res;
		}
	);

	return response;
};

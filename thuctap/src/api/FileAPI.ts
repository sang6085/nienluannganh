import { FileDTO } from '../DTO/File/FileDTO';
import { FileDTOGet } from '../DTO/File/FileDTOGet';
import { RenameFileDTO } from '../DTO/File/RenameFileDTO';
import { BaseResponse } from '../DTO/response/BaseResponse';
import { BooleanAPIResult } from '../DTO/response/Document';
import { FileDTOAPIList, ResponseUploadFileChunkDTO } from '../DTO/response/File';
import { callApi } from './api';

export const FilePost = (
	file: any,
	FolderId: number,
	onUploadProgress?: (progressEvent: any) => void
): Promise<BaseResponse<FileDTO> | undefined> => {
	const response = callApi(
		'POST',
		`/api/v1/Files?folderId=${FolderId}`,
		file,
		true,
		false,
		onUploadProgress
	).then((res: BaseResponse<FileDTO>) => {
		return res;
	});
	return response;
};
export const FileGet = (params: FileDTOGet): Promise<BaseResponse<FileDTOAPIList> | undefined> => {
	const response = callApi(
		'GET',
		`/api/v1/Files?Page=${params.Page}&Search=${params.Search}&FolderId=${params.FolderId}&PageSize=${params.PageSize}`
	).then((res: BaseResponse<FileDTOAPIList>) => {
		return res;
	});
	return response;
};
export const RenamePost = (
	data: RenameFileDTO
): Promise<BaseResponse<BooleanAPIResult> | undefined> => {
	const response = callApi('POST', '/api/v1/Files/rename', data).then(
		(res: BaseResponse<BooleanAPIResult>) => {
			return res;
		}
	);
	return response;
};
export const DownloadGet = (id: number, onDownloadProgress?: (progressEvent: any) => void) => {
	const response = callApi(
		'GET',
		`/api/v1/Files/download/${id}`,
		null,
		true,
		true,
		undefined,
		onDownloadProgress
	).then((res) => {
		return res;
	});
	return response;
};

//
export const FilePostChunk = (
	body: any,
	onUploadProgress?: (progressEvent: any) => void
): Promise<BaseResponse<ResponseUploadFileChunkDTO> | undefined> => {
	const response = callApi('POST', `/api/v1/Files/chunk`, body, true, false, onUploadProgress).then(
		(res: BaseResponse<ResponseUploadFileChunkDTO>) => {
			return res;
		}
	);
	return response;
};

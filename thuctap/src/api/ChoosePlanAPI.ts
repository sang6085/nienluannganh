import {
	ChoosePlanDTO,
	ChoosePlanByIdDTO,
	ChoosePlanByTextDTO,
} from '../DTO/ChoosePlan/ChoosePlanDTO';
import { BaseResponse } from '../DTO/response/BaseResponse';
import { ChoosePlanResponse } from '../DTO/response/ChoosePlan';
import { callApi } from './api';
import { BaseOptions } from '../DTO/response/BaseOptions';
import { BaseData } from '../DTO/response/BaseData';

export const ChoosePlanGet = (
	chooseplan: ChoosePlanDTO
): Promise<BaseResponse<BaseData<ChoosePlanResponse>> | undefined> => {
	const response = callApi(
		'GET',
		`/api/v1/Licenses?Page=${chooseplan?.Page}&PageSize=${chooseplan?.PageSize}`
	).then((res: BaseResponse<BaseData<ChoosePlanResponse>>) => {
		return res;
	});
	return response;
};

export const ChoosePlanDelete = (
	chooseplan: ChoosePlanByIdDTO
): Promise<BaseResponse<ChoosePlanResponse> | undefined> => {
	const response = callApi('DELETE', '/api/v1/Licenses', chooseplan).then(
		(res: BaseResponse<ChoosePlanResponse>) => {
			return res;
		}
	);
	return response;
};

export const ChoosePlanPost = (
	chooseplan: ChoosePlanDTO
): Promise<BaseResponse<ChoosePlanResponse> | undefined> => {
	const response = callApi('POST', '/api/v1/Licenses', chooseplan).then(
		(res: BaseResponse<ChoosePlanResponse>) => {
			return res;
		}
	);
	return response;
};

export const ChoosePlanGetById = (
	chooseplan: ChoosePlanByIdDTO
): Promise<BaseResponse<ChoosePlanResponse> | undefined> => {
	const response = callApi('GET', `/api/v1/Licenses/${chooseplan?.id}}`).then(
		(res: BaseResponse<ChoosePlanResponse>) => {
			return res;
		}
	);
	return response;
};

export const ChoosePlanGetByText = (
	chooseplan: ChoosePlanByTextDTO
): Promise<BaseOptions<ChoosePlanResponse> | undefined> => {
	const response = callApi('GET', `/api/v1/Licenses/select_list?text=${chooseplan?.text}}`).then(
		(res: BaseOptions<ChoosePlanResponse>) => {
			return res;
		}
	);
	return response;
};

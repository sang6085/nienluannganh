export interface BaseResponse<T> {
	errorCode?: number;
	data?: T;
	errorMessage?: string;
}

export interface ChoosePlanDTO {
    Search?: string;
	Order?: string;
	Page?: number;
	PageSize?: number;
}

export interface ChoosePlanByIdDTO {
	id?: number;
}

export interface ChoosePlanByTextDTO {
	text?: string;
}

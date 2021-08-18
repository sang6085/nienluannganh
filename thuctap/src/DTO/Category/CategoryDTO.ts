export interface CategoryDTO {
	id?: number;
	name?: string;
}

export interface CategoryGetDTO {
	Search?: string;
	Order?: string;
	Page?: number;
	PageSize?: number;
	Skip?: number;
}

export interface CategoryByIdDTO {
	id?: number;
}

export interface CategoryBySelectListDTO {
	text?: string;
}

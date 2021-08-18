import { SelectItemDTO } from '../Category/SelectItemDTO';

export interface SelectListDTOAPIResult {
	options?: SelectItemDTO[];
}

export interface CategoryResponseGet {
	id?: number;
	name?: string;
}
export interface CategoryResponsePost {
	id?: number;
	name?: string;
}

export interface CategoryResponseDelete {
	status?: boolean;
}

export interface CategoryResponseGetById {
	id?: number;
	name?: string;
}

export interface CategoryResponseGetBySelectList {
	key?: string;
	text?: string;
}

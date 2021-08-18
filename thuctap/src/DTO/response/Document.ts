import { FolderDTO } from '../Document/FolderDTO';

export interface FolderDTOAPIResult {
	id?: number;
	name?: string;
	categoryId?: string;
	isFavorite?: boolean;
}
export interface FolderDTOAPIListAPIResult {
	totalCount?: number;
	listData?: FolderDTO[];
}
export interface BooleanAPIResult {
	data?: boolean;
}
export interface FolderDetailDTO {
	id?: number;
	name?: string;
	categoryId?: string;
}

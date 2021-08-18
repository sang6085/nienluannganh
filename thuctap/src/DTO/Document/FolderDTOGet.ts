export interface FolderDTOGet {
	CategoryId?: number;
	Search?: string | '';
	Order?: 'ASC' | 'DESC';
	Page?: number;
	PageSize?: number;
}

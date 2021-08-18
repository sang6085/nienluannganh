export interface FileDTOGet {
	FolderId?: number;
	Search?: string | '';
	Order?: 'ASC' | 'DESC';
	Page?: number;
	PageSize?: number;
}

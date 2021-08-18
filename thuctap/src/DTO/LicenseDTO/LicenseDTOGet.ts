export interface LicenseDTOGet {
	id?: number;
	Search?: string | '';
	Order?: 'ASC' | 'DESC';
	Page?: number;
	PageSize?: number;
}

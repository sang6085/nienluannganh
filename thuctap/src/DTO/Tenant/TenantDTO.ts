export interface RegisterUserDTO {
	name: string;
	loginName: string;
	password: string;
}
export interface GetTenantDTO {
	Search?: string;
	Order?: 'ASC' | 'DESC';
	Page: number;
	PageSize: number;
}

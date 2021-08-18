export interface Tenant_BooleanAPIResult {
	data?: boolean;
}

export interface UserInTenantDTO {
	name: string;
	loginName: string;
}

export interface UserInTenantDTOAPIList {
	totalCount: number;
	listData: UserInTenantDTO[];
}

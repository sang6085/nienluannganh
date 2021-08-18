import { LicenseDTO } from '../LicenseDTO/LicenseDTO';

export interface LicenseDTOAPIResult<LicenseDTO> {
	errorCode?: number;
	data?: LicenseDTO;
	errorMessage?: string;
}
export interface LicenseDTOAPIList {
	totalCount?: number;
	listData?: LicenseDTO[];
}

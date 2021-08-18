import { FileDTO } from '../File/FileDTO';

export interface FileDTOAPIList {
	totalCount?: number;
	listData?: FileDTO[];
}
export interface ResponseUploadFileChunkDTO {
	fileId: number;
	continue: boolean;
}

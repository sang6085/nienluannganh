export interface UploadFileChunkDTO {
	FolderId: number;
	FileId?: number;
	TotalSize: number;
	ChunkSize: number;
	Chunk: number;
	File: string;
}

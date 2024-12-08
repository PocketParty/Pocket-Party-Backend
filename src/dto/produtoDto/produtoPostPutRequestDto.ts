export interface ProdutoPostPutRequestDto {
	id: number;
	enterprise_id: number;
	name: string;
	price: number;
	photo_url: string;
	description: string;
	tagsId: number[];
	created_at: Date;
	updated_at: Date;
}
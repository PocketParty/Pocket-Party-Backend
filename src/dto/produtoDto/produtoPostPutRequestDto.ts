import { Decimal } from "@prisma/client/runtime/library";

export interface ProdutoPostPutRequestDto {
	id: number;
	enterprise_id: number;
	name: string;
	price: Decimal;
	photo_url: string;
	description: string;
	tagsId: number[];
	created_at: Date;
	updated_at: Date;
}
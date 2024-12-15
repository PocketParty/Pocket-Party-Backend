import { Decimal } from "@prisma/client/runtime/library";

export interface ProdutoPatchReqDTO{
	name: string;
	price: Decimal;
	photo_url: string;
	description: string;
	tags: string[];
}
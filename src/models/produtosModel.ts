import { Decimal } from "@prisma/client/runtime/library";

export interface Produto {
	product_id?: number;
	enterprise_id: number;
	name: string;
	price:Decimal;
	photo_url: string|null;
	description: string|null;
	tags?: Tag[]
	created_at: Date|null;
	updated_at: Date|null;
}

export interface Tag {
    tag_id: number;
    tag_name: string;
    produtos?: Produto[];
}

export interface ProductTag {
    enterprise_id: number;
    tag_id: number;
}
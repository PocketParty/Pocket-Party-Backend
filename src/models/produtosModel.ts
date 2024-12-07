export interface Produto {
	id?: number;
	enterprise_id: number;
	name: string;
	price: number;
	photo_url: string;
	description: string;
	created_at: Date;
	updated_at:Date;
}
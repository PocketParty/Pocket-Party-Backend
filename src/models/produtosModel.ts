export interface Produto {
	id?: number;
	createdAt?: Date;
	catalogoId: number;
	imagem: string;
	preco: number;
	notaAvaliacao: number;
	descricao: string;
	tags: string;
}
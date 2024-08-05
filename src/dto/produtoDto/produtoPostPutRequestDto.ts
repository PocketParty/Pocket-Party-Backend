export interface ProdutoPostPutRequestDto {
	catalogoId: number;
	preco: number
	imagem: string;
	notaAvaliacao: number
	descricao: string
	tags: string
}
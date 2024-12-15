export interface EmpresaDto {
	enterprise_id?: number;
	username: string;
	name: string;
	cnpj: string;
	atuacao: string[];
	descricao: string | null;
}
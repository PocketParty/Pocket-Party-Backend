export interface Empresa {
	enterprise_id?: number;
	username: string;
	password_hash: string;
	name: string;
	cnpj: string;
	atuacao: string[];
	descricao: string | null;
}
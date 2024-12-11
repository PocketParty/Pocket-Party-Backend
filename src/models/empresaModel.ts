export interface Empresa {
	enterprise_id?: number;
	username: string;
	password_hash: string;
	name: string;
	cnpj: string;
	atuacao: string[];
	descricao: string | null;
	tags?: Tag[];
}

export interface Tag {
    tag_id: number;
    tag_name: string;
    empresas?: Empresa[];
}

export interface EnterpriseTag {
    enterprise_id: number;
    tag_id: number;
}

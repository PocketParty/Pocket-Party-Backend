import { EmpresaPatchRequestDto } from '../dto/empresaDto/empresaPatchRequestDto';
import { Empresa } from '../models/empresaModel';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const pesquisarEmpresaPeloIdRepository = async (id: number): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.empresas.findFirst({
		where: {
			id
		}
	})
	return resultEmpresa;
};
export const pesquisarTodasEmpresaRepository = async (): Promise<Empresa[] | null> => {
	const resultEmpresa = await prisma.empresas.findMany({})
	return resultEmpresa;
};

export const pesquisarEmpresaPeloCnpjRepository = async (cnpj: string): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.empresas.findFirst({
		where: {
			cnpj
		}
	})
	return resultEmpresa;
};

export const buscarAdminPeloEmailRepository = async (email: string): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.empresas.findFirst({
		where: {
			email
		}
	})
	return resultEmpresa;
};

export const adicionarEmpresaRepository = async (empresa: Empresa): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.empresas.create({
		data: {
			...empresa
		}
	})
	return resultEmpresa;
};
export const updateEmpresaRepository = async (id: number, empresaPatchRequestDto: EmpresaPatchRequestDto): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.empresas.update({
		where: {
			id
		},
		data: {
			...empresaPatchRequestDto
		}
	})
	return resultEmpresa;
};

export const removerEmpresaRepository = async (id: number): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.empresas.delete({
		where: {
			id
		}
	})
	return resultEmpresa;
};

export const atualizarContatoEmpresaRepository = async (id: number, telefone: string): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.empresas.update({
		where: {
			id
		},
		data: {
			telefone
		}
	})
	return resultEmpresa;
};

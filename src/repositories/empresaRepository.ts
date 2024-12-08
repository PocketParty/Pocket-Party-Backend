import { EmpresaPatchRequestDto } from '../dto/empresaDto/empresaPatchRequestDto';
import { Empresa } from '../models/empresaModel';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const pesquisarEmpresaPeloIdRepository = async (enterprise_id: number): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.enterprises.findFirst({
		where: {
			enterprise_id
		}
	})
	return resultEmpresa;
};
export const pesquisarTodasEmpresaRepository = async (): Promise<Empresa[] | null> => {
	const resultEmpresa = await prisma.enterprises.findMany({})
	return resultEmpresa;
};

export const pesquisarEmpresaPeloCnpjRepository = async (cnpj: string): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.enterprises.findFirst({
		where: {
			cnpj
		}
	})
	return resultEmpresa;
};

export const buscarAdminPeloUserNameRepository = async (username: string): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.enterprises.findFirst({
		where: {
			username
		}
	})
	return resultEmpresa;
};

export const adicionarEmpresaRepository = async (empresa: Empresa): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.enterprises.create({
		data: {
			...empresa
		}
	})
	return resultEmpresa;
};
export const updateEmpresaRepository = async (enterprise_id: number, empresaPatchRequestDto: EmpresaPatchRequestDto): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.enterprises.update({
		where: {
			enterprise_id
		},
		data: {
			...empresaPatchRequestDto
		}
	})
	return resultEmpresa;
};

export const removerEmpresaRepository = async (enterprise_id: number): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.enterprises.delete({
		where: {
			enterprise_id
		}
	})
	return resultEmpresa;
};

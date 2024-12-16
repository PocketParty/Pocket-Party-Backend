import { EmpresaPatchRequestDto } from '../dto/empresaDto/empresaPatchRequestDto';
import { Empresa } from '../models/empresaModel';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const pesquisarEmpresaPeloIdRepository = async (enterprise_id: number): Promise<Empresa | null> => {
	const resultEmpresa = await prisma.enterprises.findFirst({
		where: {
			enterprise_id
		},
		include: { enterprises_tags: { include: { tags: true } } }
	})
	return resultEmpresa;
};
export const pesquisarTodasEmpresaRepository = async (): Promise<Empresa[] | null> => {
	const resultEmpresa = await prisma.enterprises.findMany({
		include: { enterprises_tags: { include: { tags: true } } }
	})
	return resultEmpresa;
};

export const pesquisarTodasEmpresaPelaTagRepository = async (tagName: string): Promise<Empresa[] | null> => {
	const resultEmpresas = await prisma.enterprises.findMany({
		where: {
			enterprises_tags: {
				some: {
					tags: {
						tag_name: tagName,
					},
				},
			},
		},
		include: {
			enterprises_tags: {
				include: {
					tags: true,
				},
			},
		},
	});
	return resultEmpresas;
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
	const {tags, atuacao, descricao} = empresaPatchRequestDto
	const resultEmpresa = await prisma.enterprises.update({
		where: {
			enterprise_id
		},
		data: {
			atuacao,
			descricao,
			enterprises_tags: {
			  create: tags.map((tag) => ({
				tags: {
				  connect: {
					tag_name: tag,
				  },
				},
			  })),
			},
		  },
		  include: { enterprises_tags: { include: { tags: true } } }
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

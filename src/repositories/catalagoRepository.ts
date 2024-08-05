import { PrismaClient } from '@prisma/client';
import { Catalogo } from '../models/catalogoModel';

const prisma = new PrismaClient();

export const adicionarCatalogoRepository = async (catalogo: Catalogo): Promise<Catalogo | null> => {
	const { quantidade , empresaId} = catalogo;
	const resultCatalogo = await prisma.catalogos.create({
		data: {
			quantidade,
			empresaId
		}
	})
	return resultCatalogo;
};

export const removerCatalogoRepository = async (id: number): Promise<Catalogo | null> => {
	const resultCatalogo = await prisma.catalogos.delete({
		where: {
			id
		}
	})
	return resultCatalogo;
};

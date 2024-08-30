// tests/app.test.ts
import request from 'supertest';
import app from '../src/index';
import { describe, it, expect } from 'vitest';
import { EmpresaGetDeleteRequestDto } from '../src/dto/empresaDto/empresaGetDeleteRequestDto';
import { EmpresaContatoPatchRequestDto } from '../src/dto/empresaDto/empresaContatoPatchRequestDto';
import { EmpresaPostPutRequestDto } from '../src/dto/empresaDto/empresaPostPutRequestDto';

describe('GET /empresas/pesquisar', () => {
	it('Pesquisa um empresa que nao existe', async () => {
		const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = { 'id': 1 }
		const response = await request(app).get('/empresas/pesquisar').send(empresaGetDeleteRequestDto);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: 'Empresa não exsite!' });
	});
});

describe('DELETE /empresas/remover', () => {
	it('Remove uma empresa que nao existe', async () => {
		const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = {
			'id': 1
		}
		const response = await request(app).delete('/empresas/pesquisar').send(empresaGetDeleteRequestDto);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({});
	});
});

describe('PATCH /empresas/atualizar/contato', () => {
	it('Remove uma empresa que nao existe', async () => {
		const empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto = {
			'id': 1,
			'contato': 'contato novo'
		}
		const response = await request(app).patch('/empresas/atualizar/contato').send(empresaContatoPatchRequestDto);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: 'Empresa não exsite!' });
	});
});

describe('POST /empresas/adicionar', () => {
	it('Adiciona uma empresa', async () => {
		const empresaPostPutRequestDto: EmpresaPostPutRequestDto = {
			"nome": "nome string",
			"endereco": "endereco string",
			"telefone": "contato string",
			"cnpj": "cnpj string",
			"email": "email string",
			"username": "username string",
			"cep": "cep string",
			"senha": "123"
		}
		const response = await request(app).post('/empresas/adicionar').send(empresaPostPutRequestDto);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
	});
});
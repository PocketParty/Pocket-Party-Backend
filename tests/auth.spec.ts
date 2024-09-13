import request from 'supertest';

beforeAll(async () => {
});

beforeEach(async () => {
});

afterEach(async () => {
});

afterAll(async () => {
});

describe('POST  /signup', () => {
	it('Cadastrar um usuario com sucesso', async () => {
		const usuarioPostPutRequestDto = {
			"username": "usuario1",
			"password": "senhausuario1"
		}
		const response = await request("http://localhost:8080").post('/signup').send(usuarioPostPutRequestDto);
		expect(response.status).toBe(200);
	});
});

describe('GET  /signin', () => {
	it('Verifica autentificação feita com sucesso', async () => {
		const usuarioPostPutRequestDto = {
			"username": "usuario1",
			"password": "senhausuario1"
		}
		const response = await request("http://localhost:8080").get('/signin').send(usuarioPostPutRequestDto);
		expect(response.status).toBe(200);
		expect(response.body.token).toBeDefined()
	});
});

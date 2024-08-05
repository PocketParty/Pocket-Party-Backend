import express from 'express';
import empresasController from './controllers/empresasController';
import catalogoControler from './controllers/catalogosController';

const app = express();
const port = 3000;


app.use(express.json());
app.use('/empresas', empresasController);
app.use('/catalogos', catalogoControler);

app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});
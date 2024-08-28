import "express-async-errors"
import express from 'express';
import empresasController from './controllers/empresasController';
import catalogoControler from './controllers/catalogosController';
import produtoController from './controllers/produtosController'
import { errorMiddleware } from './middlewares/error';

const app = express();
const port = 3001;

app.use(express.json());
app.use('/empresas', empresasController);
app.use('/catalogos', catalogoControler);
app.use('/produtos', produtoController);
app.use(errorMiddleware)

app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});
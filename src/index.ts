import "express-async-errors"
import express from 'express';
import empresasController from './controllers/empresasController';
import catalogoControler from './controllers/catalogosController';
import produtoController from './controllers/produtosController'
import { errorMiddleware } from './middlewares/error';

const app = express();
app.use(express.json());
app.use('/empresas', empresasController);
app.use('/catalogos', catalogoControler);
app.use('/produtos', produtoController);
app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
	console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
	console.log(`url = env(${process.env.DATABASE_URL})`)
});

export default app;
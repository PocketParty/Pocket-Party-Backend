import "express-async-errors"
import express from 'express';
import cors from 'cors'
import empresasController from './controllers/empresasController';
import produtoController from './controllers/produtosController'
import { errorMiddleware } from './middlewares/error';
import authController from "./controllers/authController";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/empresas', empresasController);
app.use('/produtos', produtoController);
app.use('/auth', authController);
app.use(errorMiddleware)

const server = app.listen(process.env.PORT, () => {
	console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
	console.log(`url = env(${process.env.DATABASE_URL})`)
});

export { app, server };
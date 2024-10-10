import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

export const autenticarTokenEmpresa = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'];
	if (!token) {
		return res.status(401).json({ message: 'Token não fornecido!' });
	}
	try {
		const decoded = jwt.verify(token, SECRET!);
		req.body.tokenPayload = decoded; 
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Token inválido!' });
	}
};

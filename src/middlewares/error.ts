import { NextFunction, Request, Response } from 'express'

export const errorMiddleware = (error: Error & any, req: Request, res: Response, next: NextFunction) => {
	return res.status(error.statusCode).json({ message: error.message });
}
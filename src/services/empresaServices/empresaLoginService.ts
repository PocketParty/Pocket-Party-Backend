import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EmpresaLoginRequestDTO } from '../../dto/empresaDto/EmpresaLoginRequestDTO';
import { authError } from '../../error/authError';
import { buscarAdminPeloUserNameRepository } from '../../repositories/empresaRepository';


const SECRET = process.env.SECRET;

export const empresaLoginService = async (empresaLoginRequestDTO: EmpresaLoginRequestDTO): Promise<String> => {
	const empresa = await buscarAdminPeloUserNameRepository(empresaLoginRequestDTO.username);
	if (empresa === null) {
		throw authError()
	}
	const validacaoSenha = bcrypt.compareSync(empresaLoginRequestDTO.password_hash, empresa.password_hash!)
	if (!validacaoSenha) {
		throw authError()
	}
	const payload = {
		username: empresaLoginRequestDTO.username,
		id: empresa.enterprise_id
	};
	const token = jwt.sign(payload, SECRET!, { expiresIn: "1d" });
	return token;
};

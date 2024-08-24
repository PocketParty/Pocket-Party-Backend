export const NenhumaEmpresaCadastrada = (): Error => {
    const error = new Error("Não existe empresa cadastrada no sistema");
    (error as any).statusCode = 404;
    return error;
};
export const EmpresaComMesmoCnpj = (): Error => {
    const error = new Error("Já existe empresa cadastrada com o mesmo cnpj");
    (error as any).statusCode = 404;
    return error;
};
export const EmpresaNaoExiste = (): Error => {
    const error = new Error("Empresa não exsite!");
    (error as any).statusCode = 404;
    return error;
};
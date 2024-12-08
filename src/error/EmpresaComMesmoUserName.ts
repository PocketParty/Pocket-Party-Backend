export const EmpresaComMesmoUserName = (): Error => {
    const error = new Error("UserName ja esta em uso");
    (error as any).statusCode = 409;
    return error;
};
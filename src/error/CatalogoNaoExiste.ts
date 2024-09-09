export const CatalogoNaoExiste = (): Error => {
    const error = new Error("Catalogo não exsite!");
    (error as any).statusCode = 404;
    return error;
};
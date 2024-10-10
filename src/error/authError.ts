export const authError = (): Error => {
    const error = new Error("Login ou senha incorretos!");
    (error as any).statusCode = 401;
    return error;
};
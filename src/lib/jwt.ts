import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'clave secreta');

export async function createJWT(payload) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);
}


export async function verifyJWT(token) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;                         //contiene user_id, username, etc.
    } catch (e) {
        console.error("JWT inválido:", e.message);
        return null;
    }
}
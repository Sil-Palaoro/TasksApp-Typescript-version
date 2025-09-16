import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createJWT } from '@/lib/jwt';

export async function POST(request) {
    // Obtener los datos de la solicitud 
    const { username, password } = await request.json();

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user) {
        return new Response(JSON.stringify({ error: "Usuario no encontrado"}), {
            status: 401,            
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return new Response(JSON.stringify({ error: "Contraseña no valida"}), {
            status: 401,
        });
    }

    const token = await createJWT({ username: user.username });

    return Response.json({ access: token });
}
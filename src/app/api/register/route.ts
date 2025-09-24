import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';


export async function POST(request: Request): Promise<Response> {

    const { username, password } = await request.json() as{
        username: string;
        password: string;
    };

    if (!username || typeof username !== 'string') {
        return new Response(JSON.stringify({ error: "Nombre de usuario requerido"}), {
            status: 400,
        });        
    }

    const existingUser = await prisma.user.findUnique({
        where: { username },
    });

    if (existingUser) {
        return new Response(JSON.stringify({ error: "El usuario ya existe"}), {
            status: 409,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);      

    const newUser = await prisma.user.create({
        data: { 
        username,
        password: hashedPassword, 
        },
     });


     return new Response(JSON.stringify({ message: "Usuario registrado exitosamente" }), {
        status: 201,
     });
}
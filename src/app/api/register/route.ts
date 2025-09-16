import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';


// let users = []; //almacenamiento de ususarios en memoria

export async function POST(request) {
    // Obtener los datos de la solicitud 
    const { username, password } = await request.json();

    if (!username | typeof username !== 'string') {
        return new Response(JSON.stringify({ error: "Nombre de usuario requerido"}), {
            status: 400,
        });        
    }

    // Verificar si el usuario ya existe en la base de datos 
    const existingUser = await prisma.user.findUnique({
        where: { username },
    });

    if (existingUser) {
        return new Response(JSON.stringify({ error: "El usuario ya existe"}), {
            status: 409,
        });
    }

    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);      

    // Crear el nuevo usuario en la base de datos 
    const newUser = await prisma.user.create({
        data: { 
        username,
        password: hashedPassword, // Solo para prueba. En entorno real, nunca almacenaría contraseñas en texto plano
        },
     });


     return new Response(JSON.stringify({ message: "Usuario registrado exitosamente" }), {
        status: 201,
     });
}
import { verifyJWT } from '@/lib/jwt';
import prisma from '@/lib/prisma';


export async function GET(request) {
  // Verificar el token de autorización 
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  // Si no hay token, retornar error 401 
  const payload = await verifyJWT(token);
  if (!payload) {
    return new Response(JSON.stringify({ error: "Token invalido" }), {
      status: 401,
    });
  }
  
  // Obtener el usuario 
  const user = await prisma.user.findUnique({
    where: { username: payload.username },
    include: { tasks: true } 
  });

  // Si el usuario no es válido, retornar error 404 
  if (!user) {
    return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
      status: 404,
    });
  }

  // Obtener las tareas del usuario autenticado
  // const tasks = await prisma.task.findMany({
  //   orderBy: { createdAt: 'desc' },
  // });


  return Response.json(user.tasks);
}

export async function POST(request) {
  // Verificar el token de autorización 
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  // Si no hay token, retornar error 401 
  const payload = await verifyJWT(token);
  if (!payload) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  
  // Verificar el token y obtener el usuario 
  const user = await prisma.user.findUnique({
    where: { username: payload.username },
  });


  // Si no hay usuario, retornar error 403 
  if (!user) {
    return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
      status: 404,
    });
  }

  // Obtener los datos de la solicitud 
  const data = await request.json();

  if (!data.title || typeof data.title !== 'string') {
    return new Response(JSON.stringify({ error: 'Título requerido' }), {
      status: 400,
    });
  }

  if (!data.description || typeof data.description !== 'string') {
    return new Response(JSON.stringify({ error: 'Descripción requerida' }), {
      status: 400,
    });
  }

  // Crear la nueva tarea en la base de datos 
  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description?.trim() || '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id,
    },
  });

  return Response.json(task, { status: 201 });
}

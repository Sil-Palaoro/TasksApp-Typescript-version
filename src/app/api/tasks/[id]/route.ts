import prisma from '@/lib/prisma';
import { verifyJWT } from '@/lib/jwt';


export async function PUT(request, { params }) {
  const { id } = await params;
  // Obtener el token de autorización del encabezado 
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  // Verificar el token JWT 
  const payload = await verifyJWT(token);
  if (!payload) {
    return new Response(JSON.stringify({ error: 'No autorizado'}), {
      status: 401,
    });
  }

  // Obtener el usuario autenticado
  const user = await prisma.user.findUnique({
    where: { username: payload.username },
  });
  
  if (!user) return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
    status: 404,
  });

  const taskId = parseInt(id);
  
  const data = await request.json();

  //Obtener la tarea por ID
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  // Verificar si la tarea existe y si pertenece al usuario autenticado 
  if (!task || task.userId !== user.id) {
    return new Response("No autorizado para modificar esta tarea", { status: 403 });
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: data.title,
      description: data.description,
      completed: data.completed,
    },
  });


  return Response.json(updatedTask);
}

export async function PATCH(request, { params }) { 
  const { id } = await params;
  // Obtener el token de autorización del encabezado 
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  // Verificar el token JWT 
  const payload = await verifyJWT(token);
  if (!payload) {
    return new Response(JSON.stringify({ error: 'No autorizado'}), {
      status: 401,
    });
  }

  // Obtener el usuario autenticado
  const user = await prisma.user.findUnique({
    where: { username: payload.username },
  });
  
  if (!user) return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
    status: 404,
  });

  const taskId = parseInt(id);
  
  const updates = await request.json();

  //Obtener la tarea por ID
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  // Verificar si la tarea existe y si pertenece al usuario autenticado 
  if (!task || task.userId !== user.id) {
    return new Response("No autorizado para modificar esta tarea", { status: 403 });
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.description !== undefined && { description: updates.description }),
      ...(updates.completed !== undefined && { completed: updates.completed }),
      updatedAt: new Date(),
    },
  });


  return Response.json(updatedTask);
}

export async function DELETE(request, { params}) {
  const { id } = await params;
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  //Verifica que el token JWT sea válido 
  const payload = await verifyJWT(token);
  if (!payload) return new Response('No autorizado', { status: 401 });

  // Obtener el usuario autenticado 
  const user = await prisma.user.findUnique({
    where: { username: payload.username },
  });
  
  if (!user) return new Response('Usuario no encontrado', { status: 404 });


  const taskId = parseInt(id);

  //Obtener la tarea del usuario autenticado 
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task || task.userId !== user.id) {
    return new Response('No autorizado para eliminar esta tarea', { status: 403 });
  }

  await prisma.task.delete({
    where: { id: taskId }, 
  });


  return new Response(null, { status: 204});
}

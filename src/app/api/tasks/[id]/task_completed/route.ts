import prisma from '@/lib/prisma';
import { verifyJWT } from '@/lib/jwt';

export async function POST(request, { params }) {
  try {
    const { id } = await params; 
    const token = request.headers.get('authorization')?.split(' ')[1];
    const payload = await verifyJWT(token);
    if (!payload) return new Response('No autorizado', { status: 401 });

    const user = await prisma.user.findUnique({
      where: { username: payload.username },
    });

    const taskId = parseInt(id);

    // Buscar la tarea para asegurarse de que pertenece al usuario
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return new Response('No se encontró la tarea', { status: 403 });
    }

    if (task.userId !== user.id) {
      return new Response('El usuario no está autorizado', { status: 403 });
    }

    // Invertir el valor de completed
    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        completed: !task.completed,
      },
    });

    return Response.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error del servidor', { status: 500 });
  }
}

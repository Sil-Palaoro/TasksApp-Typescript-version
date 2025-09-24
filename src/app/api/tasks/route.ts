import { verifyJWT } from '@/lib/jwt';
import prisma from '@/lib/prisma';


const verifyToken = (request: Request) => {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  return token;
}

async function getPayload(token: string | undefined) {
  const payload = await verifyJWT(token);

  if (!payload) {
    return null;
  }

  return payload;
}


export async function GET(request: Request): Promise<Response> {

  const token = verifyToken(request);
  const payload = await getPayload(token);

   if (!payload) {
    return new Response(JSON.stringify({ error: "Token inválido" }), {
      status: 401,
    });
  }
  
  const user = await prisma.user.findUnique({
    where: { username: payload.username },
    include: { tasks: true } 
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
      status: 404,
    });
  }

  return Response.json(user.tasks);
};


export async function POST(request: Request): Promise<Response> {
    
  const token = verifyToken(request);
  const payload = await getPayload(token);

 if (!payload) {
    return new Response(JSON.stringify({ error: "Token inválido" }), {
      status: 401,
    });
  }
  
  const user = await prisma.user.findUnique({
    where: { username: payload.username },
  });


  if (!user) {
    return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
      status: 404,
    });
  }

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
};

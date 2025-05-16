import { clerkClient } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
dotenv.config();


export async function POST({ locals, request }: { locals: any, request: Request }) {

    const { userId } = locals.auth();  // No pasar request aquí

    if (!userId) {
        return new Response(JSON.stringify({ error: 'No autorizado' + userId }), { status: 401 });
    }

    const { role } = await request.json();
    const validRoles = ['organizador', 'participante'];

    if (!validRoles.includes(role)) {
        return new Response(JSON.stringify({ error: 'Rol inválido' }), { status: 400 });
    }

    try {
        const updatedUser = await clerkClient.users.updateUser(userId, {
            publicMetadata: { role },
        });

        return new Response(JSON.stringify({ success: true, user: updatedUser }), { status: 200 });
    } catch (error) {
        console.error('Error al asignar rol:', error);
        return new Response(JSON.stringify({ error: 'Error al asignar rol' + error }), { status: 500 });
    }
}



// import type { APIRoute } from 'astro';
// import db from '../../lib/db';

// export const POST: APIRoute = async ({ request }) => {
//     const { userId, role } = await request.json();

//     const validRoles = ['organizador', 'participante'];

//     if (!userId || !validRoles.includes(role)) {
//         return new Response(JSON.stringify({ error: 'Datos inválidos' }), {
//             status: 400,
//         });
//     }

//     try {
//         const conn = await db.getConnection();

//         // Verifica si ya tiene un rol asignado
//         const [rows] = await conn.execute(
//             'SELECT * FROM roles WHERE user_id = ?',
//             [userId]
//         );

//         if ((rows as any[]).length > 0) {
//             // Actualiza el rol
//             await conn.execute(
//                 'UPDATE roles SET role = ? WHERE user_id = ?',
//                 [role, userId]
//             );
//         } else {
//             // Inserta nuevo rol
//             await conn.execute(
//                 'INSERT INTO roles (user_id, role) VALUES (?, ?)',
//                 [userId, role]
//             );
//         }

//         conn.release();

//         return new Response(JSON.stringify({ success: true }), {
//             status: 200,
//         });
//     } catch (err) {
//         console.error(err);
//         return new Response(JSON.stringify({ error: 'Error del servidor' }), {
//             status: 500,
//         });
//     }
// };

import type { APIRoute } from 'astro';
import db from '../../lib/db';



export const GET: APIRoute = async ({ url }) => {
    const userId = url.searchParams.get('userId');

    if (!userId) {
        return new Response(
            JSON.stringify({ error: 'Missing userId parameter' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const [rows] = await db.query('SELECT role FROM roles WHERE user_id = ?', [userId]);

        const roles = rows as { role: string }[];

        if (roles.length === 0) {
            return new Response(
                JSON.stringify({ role: null }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Si hay varios roles, devuelve el primero (o podrías devolver todos)
        return new Response(
            JSON.stringify({ role: roles[0].role }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error checking role:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

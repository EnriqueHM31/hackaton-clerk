import type { APIRoute } from 'astro';
import pool from '../../lib/db';

import dotenv from 'dotenv';
dotenv.config();

export const GET: APIRoute = async ({ request, locals }) => {
    const { userId } = locals.auth();

    // if (!userId) {
    //     return new Response(
    //         JSON.stringify({ error: 'No autenticado' }),
    //         {
    //             status: 401,
    //             headers: { 'Content-Type': 'application/json' },
    //         }
    //     );
    // }

    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.query(
            'SELECT id,user_id, nombre, descripcion, start_date, end_date, instrucciones, imagen, lenguajes, premios FROM hackathons WHERE user_id = ? ORDER BY start_date DESC',
            ['user_2x9myDXVlQ2vdHnCqo8KMzfKUyq']
        );

        connection.release();

        const hackatones = (rows as any[]).map((h) => ({
            ...h,
            lenguajes: JSON.stringify(h.lenguajes),
            premios: JSON.stringify(h.premios),
        }));

        return new Response(JSON.stringify(hackatones), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error al obtener hackatones del usuario:', error);
        connection.release();
        return new Response(
            JSON.stringify({ error: 'Error al obtener hackatones del usuario' + error }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};

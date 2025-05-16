import type { APIRoute } from 'astro';
import pool from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const idHack = body.idHack;
    console.log(idHack);

    if (!idHack) {
        return new Response(
            JSON.stringify({ error: 'ID de hackatón no proporcionado' }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    const connection = await pool.getConnection();

    try {
        const rows = await connection.query(
            'SELECT id,user_id, nombre, descripcion, start_date AS fecha, end_date, instrucciones, imagen, lenguajes, premios FROM hackathons WHERE id = ?',
            [idHack]
        );

        connection.release();

        if (!rows || (rows as any[]).length === 0) {
            return new Response(JSON.stringify({ error: 'Hackatón no encontrado' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const hackatonRaw = rows[0];
        const hackaton = {
            ...hackatonRaw,
        };

        return new Response(JSON.stringify({ hackaton }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        connection.release();
        console.error('Error al obtener hackatón:', error);
        return new Response(JSON.stringify({ error: 'Error del servidor' + error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};


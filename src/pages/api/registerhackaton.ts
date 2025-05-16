import type { APIRoute } from 'astro';
import pool from '../../lib/db';
import dotenv from 'dotenv';
dotenv.config();

export const POST: APIRoute = async ({ request, locals }) => {

    const { userId } = locals.auth()
    if (!userId) {
        return new Response(JSON.stringify({ error: 'No autenticado' + userId }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const data = await request.json();

        const {
            nombre,
            descripcion,
            startDate,
            endDate,
            instrucciones,
            imagen,
            lenguajes,
            premios,
            sitio,
        } = data;

        const connection = await pool.getConnection();

        const query = `
            INSERT INTO hackathons 
            (user_id, nombre, descripcion, start_date, end_date, instrucciones, imagen, lenguajes, premios, sitio)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            userId,
            nombre,
            descripcion,
            startDate,
            endDate,
            instrucciones,
            imagen,
            JSON.stringify(lenguajes),
            JSON.stringify(premios),
            sitio,
        ];

        await connection.execute(query, values);
        connection.release();

        return new Response(JSON.stringify({ message: 'Hackatón registrado con éxito' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error al registrar hackatón:', error);
        return new Response(JSON.stringify({ error: 'Error interno al registrar hackatón' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

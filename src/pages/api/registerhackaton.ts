import type { APIRoute } from 'astro';
import pool from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
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
        } = data;

        // Validación rápida
        if (
            !nombre || !descripcion || !startDate || !endDate ||
            !instrucciones || !lenguajes || !premios
        ) {
            return new Response(JSON.stringify({ error: 'Datos incompletos' }), {
                status: 400,
            });
        }

        const conn = await pool.getConnection();

        try {
            const query = `
        INSERT INTO hackathons 
        (nombre, descripcion, start_date, end_date, instrucciones, imagen, lenguajes, premios)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

            await conn.execute(query, [
                nombre,
                descripcion,
                startDate,
                endDate,
                instrucciones,
                imagen,
                JSON.stringify(lenguajes),
                JSON.stringify(premios),
            ]);

            return new Response(JSON.stringify({ message: 'Hackathon registrado exitosamente' }), {
                status: 200,
            });
        } finally {
            conn.release();
        }
    } catch (error) {
        console.error('Error en el registro de hackathon:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
            status: 500,
        });
    }
};

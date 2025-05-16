// src/pages/api/allhackatones.ts
import type { APIRoute } from 'astro';
import pool from '../../lib/db';

export const GET: APIRoute = async () => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            `SELECT id, nombre, descripcion, start_date, end_date, instrucciones, imagen, lenguajes, premios 
             FROM hackathons 
             ORDER BY start_date DESC`
        );

        connection.release();

        const hackatones = (rows as any[]).map((h) => ({
            ...h,
            lenguajes: safeParseJSON(h.lenguajes),
            premios: safeParseJSON(h.premios),
        }));

        return new Response(JSON.stringify(hackatones), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        connection.release();
        return new Response(
            JSON.stringify({ error: 'Error al obtener hackatones: ' + String(error) }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};

// Función que asegura que solo se parsea si es JSON válido
function safeParseJSON(value: string) {
    try {
        return JSON.parse(value);
    } catch {
        return []; // O podrías retornar `null` si prefieres
    }
}

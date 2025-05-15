import type { APIRoute } from 'astro';
import db from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        const userId = body.userId as string;
        const name = body.name as string;
        const email = body.email as string;
        let createdAt = body.created_at;

        // Si no viene created_at o es inválido, usa el timestamp actual (en segundos)
        if (!createdAt) {
            createdAt = Math.floor(Date.now() / 1000);
        } else {
            // Intenta convertir a timestamp en segundos
            const date = new Date(createdAt);
            if (isNaN(date.getTime())) {
                createdAt = Math.floor(Date.now() / 1000);
            } else {
                createdAt = Math.floor(date.getTime() / 1000);
            }
        }

        // Verificar si ya existe usuario con ese id
        const [rows]: any = await db.query('SELECT id FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            // Insertar nuevo usuario
            await db.query(
                'INSERT INTO users (id, name, email, created_at) VALUES (?, ?, ?, ?)',
                [userId, name, email, createdAt]
            );
        } else {
            // Si quieres actualizar datos, puedes hacerlo aquí, o dejar así
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error en register:', error);
        return new Response(JSON.stringify({ error: 'Error al registrar usuario' }), { status: 500 });
    }
};

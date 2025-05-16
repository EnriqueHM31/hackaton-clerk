import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Participante = {
    id: number;
    user_id: string;
    url_repo: string;
};

type Props = {
    idHack: number;
};

const ParticipantesHackaton: React.FC<Props> = ({ idHack }) => {
    const [participantes, setParticipantes] = useState<Participante[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParticipantes = async () => {
            try {
                const res = await fetch('/api/participantes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idHack }),
                });

                const data = await res.json();

                if (!res.ok) {
                    toast.error(data.error || 'Error al obtener participantes');
                    return;
                }

                setParticipantes(data);
            } catch (error) {
                console.error(error);
                toast.error('Error al conectar con el servidor');
            } finally {
                setLoading(false);
            }
        };

        fetchParticipantes();
    }, [idHack]);

    if (loading) return <p className="text-white">Cargando participantes...</p>;

    if (participantes.length === 0) return <p className="text-gray-300">No hay participantes inscritos aún.</p>;

    return (
        <div className="p-4 bg-white rounded-xl shadow-md max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Participantes inscritos</h2>
            <ul className="space-y-3">
                {participantes.map((p) => (
                    <li key={p.id} className="p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                        <p className="text-gray-800 font-medium">🧑 Usuario: {p.user_id}</p>
                        <a
                            href={p.url_repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            🔗 Repositorio: {p.url_repo}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParticipantesHackaton;

import { useState } from 'react';

type Props = {
    userId: string | undefined;
    onRoleAssigned: () => void;
};

export default function AssignRoleModal({ userId, onRoleAssigned }: Props) {
    const [role, setRole] = useState('participante');
    const [loading, setLoading] = useState(false);

    const assignRole = async () => {
        setLoading(true);
        const res = await fetch('/api/get-role', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, role }),
        });

        if (res.ok) {
            onRoleAssigned();
        } else {
            new Error('Error al asignar rol.');
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-t from-purple-950 to-black  z-200">
            <div className="bg-black border border-white/50 p-13 rounded-3xl shadow-md  text-center">
                <h2 className="text-xl font-bold mb-6">Selecciona tu rol</h2>
                <div className="flex justify-center gap-6 mb-6">
                    <button
                        onClick={() => setRole('participante')}
                        className={`px-6 py-2 rounded border ${
                            role === 'participante'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-transparent text-white border-white/50 hover:bg-white/20'
                        }`}
                    >
                        Participante
                    </button>
                    <button
                        onClick={() => setRole('organizador')}
                        className={`px-6 py-2 rounded border ${
                            role === 'organizador'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-transparent text-white border-white/50 hover:bg-white/20'
                        }`}
                    >
                        Organizador
                    </button>
                </div>
                <button
                    className="bg-secondary text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={assignRole}
                    disabled={loading || !role}
                >
                    {loading ? 'Asignando...' : 'Confirmar'}
                </button>
            </div>
        </div>
    );
}

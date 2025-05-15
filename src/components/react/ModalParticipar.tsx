// src/components/FormularioParticipacion.tsx
import { useState } from 'react';

export default function FormularioParticipacion() {
    const [abierto, setAbierto] = useState(false);

    return (
        <>
            <button
                onClick={() => setAbierto(true)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all z-50"
            >
                Participar
            </button>

            {abierto && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
                    <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-full max-w-lg relative">
                        <button
                            onClick={() => setAbierto(false)}
                            className="absolute top-2 right-2 text-white text-5xl font-bold hover:text-pink-500"
                        >
                            ×
                        </button>
                        <h2 className="text-3xl font-bold mb-6">Formulario de participación</h2>
                        <form className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Nombre de usuario"
                                className="p-3 rounded bg-gray-800 text-white"
                                required
                            />

                            <input
                                type="url"
                                placeholder="Perfil de GitHub (https://github.com/usuario)"
                                className="p-3 rounded bg-gray-800 text-white"
                                required
                            />

                            <input
                                type="number"
                                placeholder="Número de participantes"
                                min={1}
                                max={10}
                                className="p-3 rounded bg-gray-800 text-white"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Nombre del proyecto"
                                className="p-3 rounded bg-gray-800 text-white"
                                required
                            />

                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all mt-5"
                            >
                                Inscribirse
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

import React, { useState } from 'react';
import toast from 'react-hot-toast';

type Hackaton = {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    end_date: string;
    lenguajes: string[]; // o string
    imagen: string;
};

type Props = {
    hackaton: Hackaton;
    onDeleted?: () => void;
};

const HackatonCard: React.FC<Props> = ({ hackaton, onDeleted }) => {
    const [showModal, setShowModal] = useState(false);

    const handleEliminar = async () => {
        try {
            const res = await fetch('/api/eliminarhack', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idHack: hackaton.id }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(`Error: ${data.error || 'No se pudo eliminar'}`);
                return;
            }

            toast.success('Hackatón eliminado correctamente ✅');
            onDeleted?.();
            setShowModal(false);
        } catch (error: any) {
            console.error('Error al eliminar:', error);
            toast.error('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="relative p-4 rounded-xl bg-transparent text-black w-full my-4 z-50 flex flex-col gap-5">
            <div className="flex-1">
                <img src={hackaton.imagen} alt={hackaton.nombre} className="w-full h-64 object-cover rounded-md mb-4" />
            </div>
            <div className="flex-2 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <span className="text-primary text-xl ">Nombre </span>
                    <h2 className="text-lg font-bold text-white ">{hackaton.nombre}</h2>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-primary text-xl ">Descripcion </span>
                    <h2 className="text-lg font-bold text-white">{hackaton.descripcion}</h2>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-primary text-xl ">Duracion </span>
                    <h2 className="text-lg font-bold text-primary ">
                        <p className="mt-2 text-lg text-white">
                            Del{' '}
                            {new Date(hackaton.fecha).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}{' '}
                            al <br />{' '}
                            {new Date(hackaton.end_date).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </h2>
                </div>
                <div>
                    <span className="text-primary text-xl ">Lenguajes </span>
                    <p className="mt-2 text-lg text-white font-bold">
                        {Array.isArray(hackaton.lenguajes) ? hackaton.lenguajes.join(', ') : hackaton.lenguajes}
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg z-50"
                >
                    Eliminar Hackatón
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gradient-to-b to-black/60 from-black/30 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-black rounded-xl p-6 w-full max-w-md text-center">
                        <h3 className="text-xl font-bold mb-4 text-white">¿Eliminar este hackatón?</h3>
                        <p className="mb-6 text-blue-400">Esta acción no se puede deshacer.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-black font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleEliminar}
                                className="px-4 py-2 rounded-md bg-primary hover:bg-primary text-white font-semibold"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HackatonCard;

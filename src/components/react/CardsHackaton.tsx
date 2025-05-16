import { useState } from 'react';
import { lenguajesSelect } from '../../assets/js/constantes';

interface Hackaton {
    id: number;
    nombre: string;
    descripcion: string;
    start_date: string;
    lenguajes: string[];
    imagen: string;
}

export default function HackatonesList({ hackatones }: { hackatones: Hackaton[] }) {
    const [visibleCount, setVisibleCount] = useState(6);
    const [filtrar, setFiltrar] = useState<string>('');

    // Filtrar hackatones según lenguaje
    const hackatonesFiltrados = filtrar ? hackatones.filter((h) => h.lenguajes.includes(filtrar)) : hackatones;
    console.log(hackatonesFiltrados);

    // Hackatones que se van a renderizar según visibleCount
    const hackatonesVisibles = hackatonesFiltrados.slice(0, visibleCount);

    // Función para mostrar más hackatones
    const handleVerMas = () => {
        setVisibleCount((prev) => Math.min(prev + 6, hackatonesFiltrados.length));
    };

    return (
        <main className="col-span-4 row-span-4 shadow-md flex items-center flex-col h-full z-50 gap-8 overflow-y-auto max-h-screen py-8 px-10">
            <div className="flex items-center justify-between w-full " data-aos="zoom-in" data-aos-delay="100">
                <h2 className="w-full text-start text-6xl font-bold bg-clip-text bg-gradient-to-r from-blue-300 via-pink-400 to-secondary text-transparent py-4">
                    Hackatones
                </h2>

                <div className="w-full flex gap-6 items-center justify-end">
                    <label className="text-white font-semibold flex items-center justify-center" htmlFor="lenguajes">
                        Filtrar por lenguaje:
                    </label>
                    <div className="relative flex items-center justify-center">
                        <select
                            className="w-full rounded-md bg-black text-white border border-primary px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-40"
                            name="lenguajes"
                            id="lenguajes"
                            value={filtrar}
                            onChange={(e) => {
                                setFiltrar(e.target.value);
                                setVisibleCount(6); // reiniciar paginación al filtrar
                            }}
                        >
                            {lenguajesSelect.map((lenguaje) => (
                                <option key={lenguaje.value} value={lenguaje.value}>
                                    {lenguaje.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-20 w-full max-h-screen z-50"
                id="hackatones"
            >
                {hackatonesVisibles.map(({ id, nombre, descripcion, start_date, lenguajes, imagen }) => (
                    <a
                        href={`/hackaton/${id}`}
                        key={id}
                        className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono card-animada shadow-xl hover:shadow-purple-600 transition-colors duration-200 z-50"
                    >
                        <div className="flex justify-between items-center z-50">
                            <div className="flex space-x-2 text-red-500">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <p className="text-sm">bash</p>
                        </div>
                        <div className="mt-4  flex flex-col justify-between min-h-42 gap-3 z-50">
                            <div className="flex w-full justify-between items-center aspect-square max-h-56 py-1 relative">
                                <div className="absolute w-full h-full bg-gradient-to-b from-black/50 via-transparent to-black/50 z-0"></div>

                                {imagen && (
                                    <img
                                        src={imagen}
                                        alt={`Imagen del hackatón ${nombre}`}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>
                            <div className="h-full flex justify-between flex-col  min-h-36 gap-3 z-50">
                                <p className="text-green-400 text-3xl font-bold">$ {nombre}</p>
                                <p className="text-white z-50">+ {start_date}</p>
                                <p className="text-green-400">$ {lenguajes.join(', ')}</p>
                                <p className="text-white line-clamp-2">{descripcion}</p>
                            </div>
                            <div className="relative group flex items-center justify-center mt-6">
                                <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                    <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                        <div className="relative z-10 flex items-center space-x-2">
                                            <span className="transition-all duration-500 group-hover:translate-x-1">
                                                Participar
                                            </span>
                                            <svg
                                                className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                                data-slot="icon"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    clipRule="evenodd"
                                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                    fillRule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </a>
                ))}

                {visibleCount < hackatonesFiltrados.length ? (
                    <div className="flex flex-col items-center justify-center py-6 w-full col-span-3">
                        <button
                            onClick={handleVerMas}
                            className="bg-gradient-to-b from-black/25 to-black/50 font-bold text-lg px-6 py-3 rounded-2xl border border-secondary"
                        >
                            Ver más...
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 w-full col-span-3"></div>
                )}
            </div>
        </main>
    );
}

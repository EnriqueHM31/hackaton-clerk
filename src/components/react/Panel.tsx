'use client';
import React, { useState, useMemo } from 'react';
import PreviewCard from './CarPrev';
import ModalLenguajes from './ModalLenguajes';
import ModalPremios from './ModalPremios';

export default function HackathonForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        startDate: '',
        endDate: '',
        instrucciones: '',
        imagen: '',
        lenguajes: ['JavaScript', 'Python'],
        premios: [] as string[],
    });

    const [showModal, setShowModal] = useState(false);
    const [showPremiosModal, setShowPremiosModal] = useState(false);

    const fecha = useMemo(() => {
        return formData.startDate || formData.endDate
            ? `${formData.startDate || '...'} - ${formData.endDate || '...'}`
            : 'Fecha no definida';
    }, [formData.startDate, formData.endDate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, imagen: imageUrl }));
        }
    };

    const toggleLenguaje = (lang: string) => {
        setFormData((prev) => {
            const yaEsta = prev.lenguajes.includes(lang);
            const nuevos = yaEsta ? prev.lenguajes.filter((l) => l !== lang) : [...prev.lenguajes, lang];
            return { ...prev, lenguajes: nuevos };
        });
    };

    const setPremios = (nuevosPremios: string[]) => {
        setFormData((prev) => ({ ...prev, premios: nuevosPremios }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/registerhackaton', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(`Error al registrar: ${res.statusText}`);
            }

            const data = await res.json();
            console.log('Hackathon registrado con éxito:', data);
            alert('✅ Hackathon creado correctamente');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('❌ Ocurrió un error al registrar el hackathon');
        }
    };

    return (
        <div className="p-8 rounded-2xl shadow-lg w-full mb-16 flex gap-10 relative justify-center items-center">
            {/* Formulario */}
            <div className="flex-1 bg-black z-50 p-5 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-pink-400 to-secondary">
                    Crear nuevo Hackathon
                </h2>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del hackathon"
                        className="p-3 border border-secondary rounded bg-black placeholder:text-white text-white"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        rows={4}
                        className="p-3 border border-secondary rounded bg-black placeholder:text-white text-white resize-none"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <label htmlFor="startDate" className="flex flex-col gap-2">
                            <p className="text-secondary text-2xl font-bold">Fecha de inicio</p>
                            <input
                                type="date"
                                name="startDate"
                                id="startDate"
                                className="p-3 border border-secondary rounded bg-black placeholder:text-white text-white"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label htmlFor="endDate" className="flex flex-col gap-2">
                            <p className="text-secondary text-2xl font-bold">Fecha de fin</p>
                            <input
                                type="date"
                                name="endDate"
                                id="endDate"
                                className="p-3 border border-secondary rounded bg-black placeholder:text-white text-white"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <textarea
                        name="instrucciones"
                        placeholder="Instrucciones"
                        className="p-3 border border-secondary rounded bg-black placeholder:text-white text-white resize-none"
                        value={formData.instrucciones}
                        onChange={handleChange}
                        required
                    />

                    <div className="grid w-full items-center gap-3">
                        <label className="text-secondary text-2xl font-bold">Imagen</label>
                        <input
                            id="picture"
                            type="file"
                            accept="image/*"
                            className="flex h-10 w-full rounded-md border border-secondary bg-black px-3 py-2 text-sm text-white file:border-0 file:bg-transparent file:text-black file:text-sm file:font-medium"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Lenguajes */}
                    <div className="flex flex-col gap-4">
                        <p className="text-secondary text-2xl font-bold mb-2">Lenguajes seleccionados:</p>
                        <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            className="bg-black border border-secondary text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Escoge los lenguajes
                        </button>
                        <div className="flex flex-wrap gap-4">
                            {formData.lenguajes.length > 0 ? (
                                formData.lenguajes.map((lang) => (
                                    <span key={lang} className="px-3 py-1 bg-blue-700 text-white rounded-full text-sm">
                                        {lang}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400">Ninguno seleccionado</span>
                            )}
                        </div>
                    </div>

                    {/* Premios */}
                    <div className="flex flex-col gap-4">
                        <p className="text-secondary text-2xl font-bold mb-2">Premios</p>
                        <button
                            type="button"
                            onClick={() => setShowPremiosModal(true)}
                            className="bg-black border border-secondary text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Añadir premios
                        </button>
                        <ul className="list-disc list-inside text-white">
                            {formData.premios.length > 0 ? (
                                formData.premios.map((premio, i) => (
                                    <li key={i} className="list-none">
                                        🏆 Premio {i + 1} : {premio}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400 list-none">Sin premios añadidos</li>
                            )}
                        </ul>
                    </div>

                    <div className="relative group flex items-center justify-center w-full">
                        <button className="w-full text-center relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                <div className="relative z-10 flex items-center space-x-2">
                                    <span className="transition-all duration-500 group-hover:translate-x-1 w-full text-center">
                                        Crear Hackathon
                                    </span>
                                </div>
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Vista previa */}
            <PreviewCard
                nombre={formData.nombre}
                descripcion={formData.descripcion}
                fecha={fecha}
                lenguajes={formData.lenguajes}
                imagen={formData.imagen}
            />

            {/* Modal de lenguajes */}
            {showModal && (
                <ModalLenguajes
                    formData={formData}
                    handleCloseModal={() => setShowModal(false)}
                    toggleLenguaje={toggleLenguaje}
                />
            )}

            {/* Modal de premios */}
            {showPremiosModal && (
                <ModalPremios
                    premios={formData.premios}
                    handleClose={() => setShowPremiosModal(false)}
                    setPremios={setPremios}
                />
            )}
        </div>
    );
}

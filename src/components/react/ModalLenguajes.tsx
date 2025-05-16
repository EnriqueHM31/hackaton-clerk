interface FormData {
    lenguajes: string[];
}

interface Props {
    formData: FormData;
    handleCloseModal: () => void;
    toggleLenguaje: (lang: string) => void;
}

export default function ModalLenguajes({ formData, handleCloseModal, toggleLenguaje }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-gray-900 text-white p-6 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">Selecciona los lenguajes</h2>
                <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    {['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'TypeScript', 'C#', 'PHP'].map((lang) => (
                        <label key={lang} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.lenguajes.includes(lang)}
                                onChange={() => toggleLenguaje(lang)}
                                className="accent-blue-500"
                            />
                            {lang}
                        </label>
                    ))}
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={handleCloseModal} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

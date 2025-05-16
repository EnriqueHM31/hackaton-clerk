'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import ModalRol from './ModalRol';
import WelcomeModal from './ModalWelcom';

export default function AuthRol() {
    const { isLoaded, user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    useEffect(() => {
        if (!isLoaded || !user || !user.id) return;

        const userRole = user.publicMetadata?.role ?? null;

        if (userRole) {
            // Si ya tiene rol, muestra bienvenida y no pide rol
            setShowModal(false);
            setShowWelcomeModal(false);
            return;
        }

        // Si no tiene rol, entonces sigue con el flujo de registrar y pedir rol
        const handleAuthFlow = async () => {
            try {
                const registerRes = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user.id,
                        name: user.fullName,
                        email: user.primaryEmailAddress?.emailAddress,
                        created_at: user.createdAt,
                    }),
                });
                if (!registerRes.ok) {
                    const text = await registerRes.text();
                    console.error('Error al registrar usuario, status:', registerRes.status, 'texto:', text);
                    throw new Error('Error al registrar usuario');
                }
                await registerRes.json();

                // Aquí podrías omitir la llamada a /api/check-role, porque ya tienes el rol en publicMetadata
                setShowModal(true);
            } catch (err) {
                console.error('Error en flujo de autenticación:', err);
            }
        };

        handleAuthFlow();
    }, [isLoaded, user]);

    const handleRoleAssigned = () => {
        setShowModal(false);
        setShowWelcomeModal(true);
    };

    const closeWelcomeModal = () => {
        setShowWelcomeModal(false);
    };

    if (!user) return null;

    return (
        <>
            {showModal && <ModalRol userId={user.id} onRoleAssigned={handleRoleAssigned} />}

            {showWelcomeModal && <WelcomeModal onClose={closeWelcomeModal} />}
        </>
    );
}

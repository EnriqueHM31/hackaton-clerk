'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import ModalRol from './ModalRol';
import WelcomeModal from './ModalWelcom'; // <-- Importa tu componente

export default function AuthRol() {
    const { isLoaded, user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    useEffect(() => {
        if (!isLoaded || !user || !user.id) return;

        const handleAuthFlow = async () => {
            try {
                // 1. Registrar usuario
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

                // 2. Verificar rol
                const roleRes = await fetch(`/api/check-role?userId=${user.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!roleRes.ok) throw new Error('Error al verificar rol');

                const roleData = await roleRes.json();
                setShowModal(roleData.role === null);
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

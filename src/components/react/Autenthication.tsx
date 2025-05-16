'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import ModalRol from './ModalRol';
import WelcomeModal from './ModalWelcom';

export default function AuthRol() {
    const { isLoaded, user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null); // <- estado para guardar el rol

    useEffect(() => {
        if (!isLoaded || !user || !user.id) return;

        const roleFromMetadata = user.publicMetadata?.role ?? null;
        setUserRole(roleFromMetadata as string); // <- actualiza el estado con el rol

        if (roleFromMetadata) {
            setShowModal(false);
            return;
        }

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
                setShowModal(true);
            } catch (err) {
                console.error('Error en flujo de autenticación:', err);
            }
        };

        handleAuthFlow();
    }, [isLoaded, user]);

    const handleRoleAssigned = async () => {
        await user?.reload(); // <- recarga el usuario desde Clerk
        const updatedRole = user?.publicMetadata?.role ?? null;
        setUserRole(updatedRole as string); // <- actualiza el estado
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

            {showWelcomeModal && userRole && <WelcomeModal role={userRole} onClose={closeWelcomeModal} />}
        </>
    );
}

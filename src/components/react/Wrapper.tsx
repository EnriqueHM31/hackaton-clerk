import { ClerkProvider } from '@clerk/clerk-react';
import AuthRol from './Autenthication';

export default function ModalAutentication() {
    return (
        <ClerkProvider publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <AuthRol />
        </ClerkProvider>
    );
}

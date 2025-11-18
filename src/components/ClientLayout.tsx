'use client';

import { AuthProvider } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default ClientLayout; 
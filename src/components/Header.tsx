import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-red-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hotdog Tracker</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {user.username}!</span>
            <button
              onClick={logout}
              className="bg-white hover:bg-yellow-300 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
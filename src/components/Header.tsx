import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-[#f0e0cc] bg-[#fff8f1]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <div>
          <h1 className="font-display text-xl font-semibold leading-none tracking-tight text-[#1c1410]">
            DogTracker3000
          </h1>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a16207]">
            Hot dog ledger
          </p>
        </div>
        {user && (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#6b5344] sm:inline">
              Signed in as <span className="font-semibold text-[#1c1410]">{user.username}</span>
            </span>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-[#e7d3bc] bg-white px-4 py-2 text-sm font-semibold text-[#1c1410] transition hover:border-[#e23d28] hover:text-[#e23d28]"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

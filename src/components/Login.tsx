import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onToggleMode: () => void;
}

const fieldClass =
  'w-full rounded-xl border border-[#eadcc8] bg-[#fffaf4] px-4 py-3 text-[#1c1410] outline-none transition placeholder:text-[#b7a08a] focus:border-[#e23d28] focus:ring-4 focus:ring-[#e23d28]/15';

const Login: React.FC<LoginProps> = ({ onToggleMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const success = await login(username, password);
    setIsLoading(false);

    if (!success) {
      setPassword('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-[0_24px_80px_rgba(80,40,10,0.12)] md:grid-cols-2">
        <div className="relative hidden flex-col justify-between bg-[#1c1410] p-10 text-[#fff6ea] md:flex">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f5b942]">
              The tally lives here
            </p>
            <h2 className="mt-3 font-display text-5xl font-semibold leading-[1.05]">
              DogTracker3000
            </h2>
          </div>
          <ul className="list-disc space-y-3 pl-5 text-sm text-[#f6e7d4]">
            <li>A running total you can actually see</li>
            <li>Logs saved on this device</li>
            <li>Your account, your tally</li>
          </ul>
        </div>

        <div className="p-8 sm:p-10">
          <p className="mb-8 font-display text-3xl font-semibold md:hidden">DogTracker3000</p>
          <h2 className="font-display text-3xl font-semibold text-[#1c1410]">Welcome back</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#6b5344]">
            Sign in and pick up the count right where you left it.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="login-username" className="mb-1.5 block text-sm font-semibold text-[#3d2b22]">
                Username
              </label>
              <input
                id="login-username"
                type="text"
                required
                className={fieldClass}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-[#3d2b22]">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                className={fieldClass}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#e23d28] px-4 py-3 font-semibold text-white shadow-sm shadow-[#e23d28]/30 transition hover:bg-[#c4311f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#6b5344]">
            New here?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="font-semibold text-[#e23d28] underline-offset-4 hover:underline"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

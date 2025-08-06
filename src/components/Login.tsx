import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onToggleMode: () => void;
}

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
    <div className="min-h-screen bg-red-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-600 rounded-full inline-flex items-center justify-center mb-4">
              <span className="text-2xl">🌭</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ever wanted to know how many hotdogs you actually consume throughout the year? 
              Sign in to continue tracking your hotdog consumption. Just for funsies!
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'block' }}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                style={{ width: '100%', boxSizing: 'border-box' }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                style={{ width: '100%', boxSizing: 'border-box' }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{ 
                width: '100%', 
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Don't have an account?
            </p>
            <button
              type="button"
              onClick={onToggleMode}
              style={{
                color: '#dc2626',
                background: 'none',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const register = async (username: string, password: string): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if username already exists
      const userExists = existingUsers.some((u: any) => u.username === username);
      if (userExists) {
        alert('Username already exists');
        return false;
      }

      // Create new user
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        username,
        password // In a real app, this should be hashed
      };

      // Save to users list
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Auto login after registration
      const userForState = { id: newUser.id, username };
      setUser(userForState);
      localStorage.setItem('currentUser', JSON.stringify(userForState));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = existingUsers.find((u: any) => u.username === username && u.password === password);
      
      if (foundUser) {
        const userForState = { id: foundUser.id, username: foundUser.username };
        setUser(userForState);
        localStorage.setItem('currentUser', JSON.stringify(userForState));
        return true;
      } else {
        alert('Invalid username or password');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
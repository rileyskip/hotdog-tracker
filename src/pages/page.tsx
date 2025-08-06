import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import HotdogForm from '../components/HotdogForm';
import HotdogList from '../components/HotdogList';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import styles from '../styles/Home.module.css';
import '../styles/styles.css';
import Image from 'next/image';

interface Hotdog {
  date: string;
  count: number;
}

const Page = () => {
  const { user, isLoading } = useAuth();
  const [hotdogs, setHotdogs] = useState<Hotdog[]>([]);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Load user-specific hotdog data when user changes
  useEffect(() => {
    if (user) {
      const userHotdogKey = `hotdogs_${user.id}`;
      const storedHotdogs = JSON.parse(localStorage.getItem(userHotdogKey) || '[]');
      setHotdogs(storedHotdogs);
    } else {
      setHotdogs([]);
    }
  }, [user]);

  // Save user-specific hotdog data when hotdogs change
  useEffect(() => {
    if (user && hotdogs.length >= 0) {
      const userHotdogKey = `hotdogs_${user.id}`;
      localStorage.setItem(userHotdogKey, JSON.stringify(hotdogs));
    }
  }, [hotdogs, user]);

  const addHotdog = (count: number) => {
    const date = new Date().toISOString().split('T')[0];
    setHotdogs([...hotdogs, { date, count }]);
  };

  const removeHotdog = (index: number) => {
    const updatedHotdogs = hotdogs.filter((_, i) => i !== index);
    setHotdogs(updatedHotdogs);
  };

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {isLoginMode ? (
          <Login onToggleMode={toggleAuthMode} />
        ) : (
          <Register onToggleMode={toggleAuthMode} />
        )}
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className="flex justify-center items-center mt-4">
          <Image src="/hotdog.png" alt="Hotdog" width={200} height={100} />
        </div>
        <div className="max-w-4xl mx-auto p-6">
          <HotdogForm addHotdog={addHotdog} />
          <HotdogList hotdogs={hotdogs} removeHotdog={removeHotdog} />
        </div>
      </div>
    </>
  );
};

export default Page;
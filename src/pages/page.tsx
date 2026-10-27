import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import HotdogForm from '../components/HotdogForm';
import HotdogList from '../components/HotdogList';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import '../styles/styles.css';

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

  const addHotdog = (date: string, count: number) => {
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl font-semibold">DogTracker3000</p>
          <p className="mt-1 text-sm text-[#8a6a45]">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return isLoginMode ? (
      <Login onToggleMode={toggleAuthMode} />
    ) : (
      <Register onToggleMode={toggleAuthMode} />
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-5 py-8">
        <section className="mb-6 rounded-[28px] bg-[#1c1410] p-6 text-[#fff6ea] shadow-xl shadow-[#1c1410]/10 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5b942]">
            Hey, {user.username}
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            How many dogs today?
          </h2>
          <p className="mt-3 max-w-md text-[#f3d7b5]">
            Log each serving. DogTracker3000 keeps the running tally.
          </p>
        </section>
        <HotdogForm addHotdog={addHotdog} />
        <HotdogList hotdogs={hotdogs} removeHotdog={removeHotdog} />
      </main>
    </div>
  );
};

export default Page;

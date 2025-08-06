import { useState, useEffect } from 'react';
import HotdogForm from '../components/HotdogForm';
import HotdogList from '../components/HotdogList';
import styles from '../styles/Home.module.css';
import '../styles/styles.css';
import Image from 'next/image';

interface Hotdog {
  date: string;
  count: number;
}

const Page = () => {
  const [hotdogs, setHotdogs] = useState<Hotdog[]>([]);

  useEffect(() => {
    const storedHotdogs = JSON.parse(localStorage.getItem('hotdogs') || '[]');
    setHotdogs(storedHotdogs);
  }, []);

  useEffect(() => {
    localStorage.setItem('hotdogs', JSON.stringify(hotdogs));
  }, [hotdogs]);

  const addHotdog = (count: number) => {
    const date = new Date().toISOString().split('T')[0];
    setHotdogs([...hotdogs, { date, count }]);
  };

  const removeHotdog = (index: number) => {
    const updatedHotdogs = hotdogs.filter((_, i) => i !== index);
    setHotdogs(updatedHotdogs);
  };

  return (
    <div className={styles.container}>
      
      <h1 className="text-red-600 text-3xl font-bold">Hotdog Tracker</h1>
      <div className="flex justify-center items-center">
        <Image src="/hotdog.png" alt="Hotdog" width={200} height={100} />
      </div>
      <HotdogForm addHotdog={addHotdog} />
      <HotdogList hotdogs={hotdogs} removeHotdog={removeHotdog} />
    </div>
  );
};

export default Page;
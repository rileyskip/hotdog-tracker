import { useState } from 'react';

interface HotdogFormProps {
  addHotdog: (count: number) => void;
}

const HotdogForm: React.FC<HotdogFormProps> = ({ addHotdog }) => {
  const [count, setCount] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHotdog(count);
    setCount(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        min="1"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value, 10))}
      />
      <button type="submit">Add Hotdog</button>
    </form>
  );
};

export default HotdogForm;

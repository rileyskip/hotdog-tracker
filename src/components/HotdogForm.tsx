import { useState } from 'react';

interface HotdogFormProps {
  addHotdog: (count: number) => void;
}

const HotdogForm: React.FC<HotdogFormProps> = ({ addHotdog }) => {
  const [count, setCount] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (count > 0) {
      addHotdog(count);
      setCount(1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Add Hotdogs</h2>
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="flex-1">
          <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
            Number of hotdogs:
          </label>
          <input
            id="count"
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </div>
        <button 
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Add Hotdogs
        </button>
      </form>
    </div>
  );
};

export default HotdogForm;

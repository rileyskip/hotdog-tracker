import { useState } from 'react';

interface HotdogFormProps {
  addHotdog: (date: string, count: number) => void;
}

function todayInputValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

const fieldClass =
  'h-12 w-full rounded-xl border border-[#eadcc8] bg-[#fffaf4] px-3 text-[#1c1410] outline-none focus:border-[#e23d28] focus:ring-4 focus:ring-[#e23d28]/15';

const HotdogForm: React.FC<HotdogFormProps> = ({ addHotdog }) => {
  const [count, setCount] = useState<number>(1);
  const [date, setDate] = useState<string>(todayInputValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (count > 0 && date) {
      addHotdog(date, count);
      setCount(1);
    }
  };

  const setBoundedCount = (next: number) => {
    setCount(Math.min(50, Math.max(1, next)));
  };

  return (
    <section className="mb-6 rounded-[28px] border border-[#f0e0cc] bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-semibold text-[#1c1410]">Log a serving</h2>
        </div>
        <p className="hidden text-sm text-[#8a6a45] sm:block">Up to 50 at a time</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="sm:w-48">
          <label htmlFor="date" className="mb-2 block text-sm font-semibold text-[#3d2b22]">
            Date
          </label>
          <input
            id="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="count" className="mb-2 block text-sm font-semibold text-[#3d2b22]">
            How many hot dogs?
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease count"
              onClick={() => setBoundedCount(count - 1)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#eadcc8] bg-[#fffaf4] text-xl font-semibold text-[#1c1410] transition hover:border-[#e23d28]"
            >
              −
            </button>
            <input
              id="count"
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setBoundedCount(parseInt(e.target.value, 10) || 1)}
              className={`${fieldClass} text-center text-lg font-semibold`}
            />
            <button
              type="button"
              aria-label="Increase count"
              onClick={() => setBoundedCount(count + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#eadcc8] bg-[#fffaf4] text-xl font-semibold text-[#1c1410] transition hover:border-[#e23d28]"
            >
              +
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="h-12 rounded-xl bg-[#1c1410] px-6 font-semibold text-[#fff6ea] transition hover:bg-[#3a2a1c]"
        >
          Add to tally
        </button>
      </form>
    </section>
  );
};

export default HotdogForm;

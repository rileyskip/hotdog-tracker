interface Hotdog {
  date: string;
  count: number;
}

interface HotdogListProps {
  hotdogs: Hotdog[];
  removeHotdog: (index: number) => void;
}

function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return isoDate;
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function dogLabel(count: number) {
  return `${count} hot dog${count === 1 ? '' : 's'}`;
}

const HotdogList: React.FC<HotdogListProps> = ({ hotdogs, removeHotdog }) => {
  const totalHotdogs = hotdogs.reduce((total, hotdog) => total + hotdog.count, 0);
  const daysLogged = new Set(hotdogs.map((hotdog) => hotdog.date)).size;
  const latest = hotdogs.reduce<Hotdog | null>((best, hotdog) => {
    if (!best || hotdog.date >= best.date) return hotdog;
    return best;
  }, null);
  const entries = hotdogs
    .map((hotdog, index) => ({ hotdog, index }))
    .sort((a, b) => b.hotdog.date.localeCompare(a.hotdog.date) || b.index - a.index);

  const stats = [
    { label: 'All-time', value: String(totalHotdogs), detail: 'hot dogs logged' },
    { label: 'Days logged', value: String(daysLogged), detail: daysLogged === 1 ? 'day with a dog' : 'days with a dog' },
    {
      label: 'Latest entry',
      value: latest ? String(latest.count) : '—',
      detail: latest ? formatDate(latest.date) : 'Nothing yet',
    },
  ];

  return (
    <section>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[24px] border border-[#f0e0cc] bg-white px-5 py-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a16207]">{stat.label}</p>
            <p className="mt-2 font-display text-4xl font-semibold text-[#1c1410]">{stat.value}</p>
            <p className="mt-1 text-sm text-[#8a6a45]">{stat.detail}</p>
          </article>
        ))}
      </div>

      <div className="overflow-hidden rounded-[28px] border border-[#f0e0cc] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#f3e6d6] px-5 py-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-[#1c1410]">The log</h2>
          <span className="rounded-full bg-[#fff1d6] px-3 py-1 text-xs font-semibold text-[#8a5a00]">
            {hotdogs.length} {hotdogs.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="font-display text-2xl font-semibold text-[#1c1410]">No dogs logged yet</p>
            <p className="mt-1 text-sm text-[#8a6a45]">Add the first serving and the tally starts here.</p>
          </div>
        ) : (
          <ul>
            {entries.map(({ hotdog, index }) => (
              <li
                key={`${hotdog.date}-${index}`}
                className="flex items-center justify-between gap-4 border-b border-[#f6eee4] px-5 py-4 last:border-b-0 sm:px-6"
              >
                <div>
                  <p className="font-semibold text-[#1c1410]">{formatDate(hotdog.date)}</p>
                  <p className="text-sm text-[#8a6a45]">{dogLabel(hotdog.count)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeHotdog(index)}
                  className="rounded-full border border-[#f0d2c8] px-3 py-1.5 text-sm font-semibold text-[#c2410c] transition hover:bg-[#fff1ea]"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default HotdogList;

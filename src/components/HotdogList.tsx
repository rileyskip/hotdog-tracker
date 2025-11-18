interface Hotdog {
  date: string;
  count: number;
}

interface HotdogListProps {
  hotdogs: Hotdog[];
  removeHotdog: (index: number) => void;
}

const HotdogList: React.FC<HotdogListProps> = ({ hotdogs, removeHotdog }) => {
  const totalHotdogs = hotdogs.reduce((total, hotdog) => total + hotdog.count, 0);

  return (
    <div>
      <h2 className="text-xl space-y-2">Total Hotdogs Eaten: {totalHotdogs}</h2>
      <table>
        <thead>
          <tr>
            <th className="text-xl">Date</th>
            <th className="text-xl">Hotdogs Eaten</th>
            <th className="text-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {hotdogs.map((hotdog, index) => (
            <tr key={index}>
              <td>{hotdog.date}</td>
              <td>{hotdog.count}</td>
              <td>
                <button onClick={() => removeHotdog(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotdogList;

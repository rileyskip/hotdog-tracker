import React, { useState, useEffect } from "react";
import HotdogForm from "../components/HotdogForm";
import HotdogList from "../components/HotdogList";

const App = () => {
  const [hotdogs, setHotdogs] = useState([]);

  useEffect(() => {
    const storedHotdogs = JSON.parse(localStorage.getItem("hotdogs")) || [];
    setHotdogs(storedHotdogs);
  }, []);

  useEffect(() => {
    localStorage.setItem("hotdogs", JSON.stringify(hotdogs));
  }, [hotdogs]);

  const addHotdog = (date, count) => {
    setHotdogs([...hotdogs, { date, count: parseInt(count, 10) }]);
  };

  return (
    <div>
      <h1>DogTracker3000</h1>
      <HotdogForm addHotdog={addHotdog} />
      <HotdogList hotdogs={hotdogs} />
    </div>
  );
};

export default App;

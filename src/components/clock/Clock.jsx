import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(time);
    };
  }, [time]);
  return (
    <div>
      <div className="clock">{time}</div>
    </div>
  );
};

export default Clock;

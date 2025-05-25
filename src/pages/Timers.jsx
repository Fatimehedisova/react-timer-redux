import { useState, useEffect } from 'react';
const Timers = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = parseInt(value, 10);
    if (isNaN(val)) val = 0;

    if ((name === 'minutes' || name === 'seconds') && val > 59) val = 59;
    if (val < 0) val = 0;

    setTime((prevTime) => ({
      ...prevTime,
      [name]: val,
    }));
  };

  const increment = (field) => {
    setTime((prev) => {
      let val = prev[field] + 1;
      if (field === 'minutes' || field === 'seconds') {
        if (val > 59) val = 59;
      }
      return { ...prev, [field]: val };
    });
  };

  const decrement = (field) => {
    setTime((prev) => {
      let val = prev[field] - 1;
      if (val < 0) val = 0;
      return { ...prev, [field]: val };
    });
  };

  const startTimer = () => {
    if (time.hours || time.minutes || time.seconds) {
      setIsRunning(true);
      setInitialTime(time);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning && (time.hours || time.minutes || time.seconds)) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;

          if (seconds > 0) {
            seconds -= 1;
          } else if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
          } else if (hours > 0) {
            hours -= 1;
            minutes = 59;
            seconds = 59;
          } else {
            clearInterval(intervalId);
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const renderTimeBox = (label,  value, name) => (
    <div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        min="0"
        max={name === 'hours' ? undefined : 59}
      />
      <div>
        <button
          onClick={() => increment(name)}
          type="button"
        >
          +
        </button>
        <button
          onClick={() => decrement(name)}
          type="button"
        >
          -
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <div>
        {renderTimeBox('Hours', time.hours, 'hours')}
        {renderTimeBox('Minutes', time.minutes, 'minutes')}
        {renderTimeBox('Seconds', time.seconds, 'seconds')}
      </div>

      <div>
        {!isRunning ? (
          <button
            onClick={startTimer}
          >
            Start
          </button>
        ) : (
          <button
            onClick={stopTimer}
          
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default Timers;

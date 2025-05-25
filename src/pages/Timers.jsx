import { useState, useEffect } from 'react';
import './Timers.css'
const Timers = () => {
  const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
  const [start, setStart] = useState(false);
  const [defaultTime, setDefaultTime] = useState({ hour: 0, minute: 0, second: 0 });
  const change = (e) => {
    const { name, value } = e.target;
    let v = parseInt(value, 10);
    if (isNaN(v)) v = 0;
    if ((name === 'minute' || name === 'second') && v > 59) v = 59;
    if (v < 0) v = 0;
    setTime((previousTime) => ({
      ...previousTime,
      [name]: v,
    }));
  };
   useEffect(() => {
    let a;
    if (start && (time.hour || time.minute || time.second)) {
      a= setInterval(() => {
        setTime((prevTime) => {
          let { hour, minute, second } = prevTime;

          if (second > 0) {
            second -= 1;
          } 
          else if (minute > 0) {
            minute -= 1;
            second = 59;
          } 
          else if (hour > 0) {
            hour -= 1;
            minute = 59;
            second = 59;
          }
           else {
            clearInterval(a);
          }

          return { hour, minute, second };
        });
      }, 1000);
    }

    return () => clearInterval(a);
  }, [start, time]);

  const increment = (item) => {
    setTime((previous) => {
      let value = previous[item] + 1;
      if (item === 'minute' || item === 'second') {
        if (value > 59) value = 59;
      }
      return { ...previous, [item]: value };
    });
  };

  const decrement = (item) => {
    setTime((previous) => {
      let value = previous[item] - 1;
      if (value < 0) value = 0;
      return { ...previous, [item]: value };
    });
  };
  const startTimer = () => {
    if (time.hour || time.minute || time.second) {
      setStart(true);
      setDefaultTime(time);
    }
  };

  const stopTimer = () => {
    setStart(false);
  };

  const renderTimeBox = (label,  value, name) => (
    <div>
      <input type="text" name={name} value={value} onChange={change} min="0" max={name === 'hours' ? undefined : 59} />
      <div className='btns-container'> <button className="increment" onClick={() => increment(name)} type="button"> + </button>
        <button className='decrement' onClick={() => decrement(name)} type="button"> - </button>
      </div>
    </div>
  );
  return (
    <div>
      <div className='inputs'>
        {renderTimeBox('Hour', time.hour, 'hour')}
        {renderTimeBox('Minute', time.minute, 'minute')}
        {renderTimeBox('Second', time.second, 'second')}
      </div>
      <div className='running-btns'>
        {!start ? (
          <button onClick={startTimer}>Start </button> ) : ( <button onClick={stopTimer}>Stop</button>)}
      </div>
    </div>
  );
};

export default Timers;

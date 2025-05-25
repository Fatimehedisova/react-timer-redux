import React, { useEffect, useState } from 'react';
import "./WorldClock.css"
const WorldClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
   return (
        <>
            <div className='clock'>
                <div className='hour'>
                    {hour < 10 ? `0${hour}` : hour}
                </div>
                <div className='minute'>
                    {minute < 10 ? `0${minute}` : minute}
                </div>
                <div className='second'>
                    {second < 10 ? `0${second}` : second}
                </div>
            </div>
        </>
    )
};

export default WorldClock;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  updateTime,
  lap,
} from "../redux/clockSlice";
const StopWatch = () => {
  const dispatch = useDispatch();
  const { time, isRunning, stopTimes } = useSelector((state) => state.clock);
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        dispatch(updateTime());
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, dispatch]);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return (
    <div >
      <div >
        <div >
          {[hours, minutes, seconds].map((unit, index) => (
            <div
              key={index}>
              {unit < 10 ? `0${unit}` : unit}
            </div>
          ))}
        </div>
      </div>
      <div >
        <button
          onClick={() => {
            isRunning ? dispatch(stopTimer()) : dispatch(startTimer());
          }}>
          {isRunning ? "Stop" : "Start"}
        </button>

        <button
          onClick={() => dispatch(lap())}
          disabled={!isRunning}>
          Lap
        </button>
        <button
          onClick={() => dispatch(resetTimer())}>
          Reset
        </button>
      </div>
      <ul className="my-10">
        {stopTimes.map((stopTime, index) => (
          <li key={index} >
            {index + 1}. {stopTime}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default StopWatch;

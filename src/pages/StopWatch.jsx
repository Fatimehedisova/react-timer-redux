import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './StopWatch.css'
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
    let a;
    if (isRunning) {
      a = setInterval(() => {
        dispatch(updateTime());
      }, 1000);
    }
    return () => clearInterval(a);
  }, [isRunning, dispatch]);
  const hour = Math.floor(time / 3600);
  const minute = Math.floor((time % 3600) / 60);
  const second = time % 60;
  return (
    <div >
      <div className="stopWatch">
        <div className="times">
          {[hour, minute, second].map((item, index) => (
            <div className="stopWatchTimes" key={index}> {item < 10 ? `0${item}` : item} </div>))}
        </div>
      </div>
      <div className="stopWatchButtons">
        <button className="btn"onClick={() => { isRunning ? dispatch(stopTimer()) : dispatch(startTimer()); }}>{isRunning ? "Stop" : "Start"}</button>
        <button  className="btn" onClick={() => dispatch(lap())} disabled={!isRunning}>Lap</button>
        <button  className="btn" onClick={() => dispatch(resetTimer())}> Reset </button>
      </div>
      <ul className="stopWatchLaps">{stopTimes.map((stopTime, index) => (
        <li key={index} >
          {stopTime}
        </li>
      ))}
      </ul>
    </div>
  );
};
export default StopWatch;

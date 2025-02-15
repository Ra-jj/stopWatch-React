//import-imports the React Library,which requires creating components
import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  //isRunning- a state variable that keeps track whether stopwatch is running (true) or stopped (false)
  //setIsRunning-  A function to update the isRunning state
  const [isRunning, setIsRunning] = useState(false);
  //elapsedTime- A state variable to store the total elapsed time in milliseconds
  //setElapsedTime- A function to update elapsedTime
  const [elapsedTime, setElapsedTime] = useState(0);
  //intervalIdRef- A reference to store the ID of the interval timer
  //useRef(null)- to initialize the ref with a default value of null
  const intervalIdRef = useRef(null);
  //startTimeRef– A reference to store the time when the stopwatch started
  //useRef(0)- to initialize the reference with a default value of 0
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      //if true a setInterval function updates elapsedTime every 10 milliseconds
      intervalIdRef.current = setInterval(() => {
        //date.now gets the current timestamp, startTimeRef.current holds the starting timestamp
        setElapsedTime(Date.now() - startTimeRef.current); //gives the elapsed time
      }, 10); //updates elapsedTime every 10 milliseconds
    }
    return () => {
      //clears the interval when isRunning changes
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true); //true- starts the stopwatch
    //elapsedTime is subtracted because if the user resumes after stopping, it continues from where it left off
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false); //stops the stopwatch
  }

  function reset() {
    setElapsedTime(0); //resets elapsedTime to 0
    setIsRunning(false); //stops the stopwatch
  }

  function formatTime() {
    //converts elapsed time (in milliseconds) to hours, minutes, seconds, and milliseconds.
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60); //Math.floor() used to round down to the nearest whole number.
    let milliseconds = Math.floor((elapsedTime % 1000) / 10); //% (modulus) ensures values stay within their respective limits.

    //padStart(2, "0") ensures each unit has two digits (e.g., 01 instead of 1).
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="stopwatch">
      {/* <div className="display"> below line – Shows formatted elapsed time */}
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button onClick={start} className="start-button">
          Start
        </button>
        <button onClick={stop} className="stop-button">
          Stop
        </button>
        <button onClick={reset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
}
//export- allows to share code between files by importing elsewhere,it is used as a function, class...
//default- specifies that this is a primary export of file, there can be only one export per file
export default Stopwatch;

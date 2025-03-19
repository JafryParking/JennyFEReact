import React, { useState, useEffect } from "react";
import "../pages/user.module.css";
import { FaParking, FaStopCircle } from "react-icons/fa";

const StartParking = () => {
  const [isParked, setIsParked] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let timer;
    if (isParked) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setTimeElapsed(0);
    }
    return () => clearInterval(timer);
  }, [isParked]);

  const handleToggleParking = () => {
    setIsParked(!isParked);
  };

  return (
    <div className="parking-container">
      <h2>{isParked ? "🅿️ Parkerad" : "🚗 Ej parkerad"}</h2>
      <button className={isParked ? "stopParkingBtn" : "startParkingBtn"} onClick={handleToggleParking}>
        {isParked ? <FaStopCircle size={24} /> : <FaParking size={24} />}
        {isParked ? " Avsluta parkering" : " Starta parkering"}
      </button>
      {isParked && (
        <div>
          <p>Parkeringstid: {timeElapsed} sekunder</p>
          <div className="parkingProgress">
            <div style={{ width: `${(timeElapsed / 600) * 100}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartParking;
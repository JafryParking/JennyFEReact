import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages/user.module.css";

const StopParking = () => {
  const { id } = useParams();
  const [isStopped, setIsStopped] = useState(false);
  const [error, setError] = useState(null);

  const handleStopParking = async () => {
    try {
      await axios.post(`http://localhost:5000/api/parking/stop/${id}`);
      setIsStopped(true);
    } catch (err) {
      setError("Kunde inte stoppa parkeringen. Försök igen.");
    }
  };

  return (
    <div className="parking-container">
      <h2>🛑 Stoppa parkering</h2>
      {isStopped ? (
        <p>✅ Parkeringen har avslutats!</p>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          <button className="stopParkingBtn" onClick={handleStopParking}>
            Stoppa parkering
          </button>
        </>
      )}
    </div>
  );
};

export default StopParking;
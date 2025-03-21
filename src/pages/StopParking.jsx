import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages/user.module.css";

const StopParking = () => {
  const { id } = useParams();
  const [isStopped, setIsStopped] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = sessionStorage.getItem("persistedUser");
        const loggedInUserId = storedUser ? JSON.parse(storedUser).id : null;

        if (loggedInUserId) {
          const response = await axios.get(`http://localhost:5020/api/ParkingServices/user/${loggedInUserId}`);
          setUserData(response.data);
          if (response.data.cars.length > 0) {
            setSelectedCar(response.data.cars[0].licencePlate);
          }
        } else {
          console.error("Ingen inloggad användare hittades.");
        }
      } catch (err) {
        setError("Kunde inte hämta användardata.");
        console.error("Fel vid hämtning av användardata:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleStopParking = async () => {
    try {
      if (!selectedCar) {
        setError("Ingen bil vald.");
        return;
      }

      await axios.get(`http://localhost:5020/api/ParkingServices/stopParking/${selectedCar}`);
      setIsStopped(true);
    } catch (err) {
      setError("Kunde inte stoppa parkeringen. Försök igen.");
      console.error("Fel vid stopp av parkering:", err);
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
          {userData && userData.cars.length > 0 && (
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="regNrDropdown"
            >
              {userData.cars.map((car) => (
                <option key={car.licencePlate} value={car.licencePlate}>
                  {car.licencePlate}
                </option>
              ))}
            </select>
          )}
          <button className="stopParkingBtn" onClick={handleStopParking}>
            Stoppa parkering
          </button>
        </>
      )}
    </div>
  );
};

export default StopParking;
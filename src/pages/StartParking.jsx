import React, { useState, useEffect } from "react";
import "../pages/user.module.css";
import { FaParking, FaStopCircle } from "react-icons/fa";
import axios from "axios";

const StartParking = () => {
  const [isParked, setIsParked] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [userData, setUserData] = useState(null);
  const [selectedCar, setSelectedCar] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hämta användardata vid inladdning
    const fetchUserData = async () => {
      try {
        const storedUser = sessionStorage.getItem("persistedUser");
        const loggedInUserId = storedUser ? JSON.parse(storedUser).id : null;

        if (loggedInUserId) {
          const response = await axios.get(`http://localhost:5020/api/ParkingServices/user/${loggedInUserId}`);
          setUserData(response.data);
          setLoading(false);
          if (response.data.cars.length > 0) {
            setSelectedCar(response.data.cars[0].licencePlate);
          }
        } else {
          console.error("Ingen inloggad användare hittades.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Fel vid hämtning av användardata:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  const handleToggleParking = async () => {
    try {
      if (loading) {
        console.error("Användardata laddas fortfarande. Försök igen om en stund.");
        alert("Användardata laddas fortfarande. Försök igen om en stund.");
        return;
      }

      if (!userData) {
        console.error("Användardata saknas. Kan inte starta parkering.");
        alert("Användardata saknas. Försök igen.");
        return;
      }

      if (!isParked) {
        // Starta parkering
        await axios.post("http://localhost:5020/api/ParkingServices/startParking", {
          licensePlate: selectedCar,
          userID: userData.id,
        });
        setIsParked(true);
      } else {
        // Stoppa parkering
        await axios.get(`http://localhost:5020/api/ParkingServices/stopParking/${selectedCar}`);
        setIsParked(false);
      }
    } catch (error) {
      console.error("Fel vid hantering av parkering:", error);
      alert("Fel vid hantering av parkering. Försök igen.");
    }
  };

  return (
    <div className="parking-container">
      {loading ? (
        <p>Laddar användardata...</p>
      ) : (
        <>
          <h2>{isParked ? "🅿️ Parkerad" : "🚗 Ej parkerad"}</h2>
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
          <button
            className={isParked ? "stopParkingBtn" : "startParkingBtn"}
            onClick={handleToggleParking}
          >
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
        </>
      )}
    </div>
  );
};

export default StartParking;
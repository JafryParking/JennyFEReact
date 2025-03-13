import React, { useState } from "react";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  const [user, setUser] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [parkingSlots, setParkingSlots] = useState(Array(6).fill(""));

  const handleSlotChange = (index, value) => {
    const newSlots = [...parkingSlots];
    newSlots[index] = value;
    setParkingSlots(newSlots);
  };

  const handleSubmit = () => {
    alert(`User: ${user}, Vehicle: ${vehicle}, Slots: ${parkingSlots.join("")}`);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar />

      {/* Spacer to push content below navbar */}
      <div className="home-content">
        <h1 className="text-2xl font-bold mb-4 text-center">Jafry Parking App</h1>
        
        <div className="input-group">
          <span className="text-xl">👤</span>
          <input
            type="text"
            placeholder="Enter name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="input-field"
          />
        </div>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter vehicle details"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="input-field"
          />
        </div>
        
        <div className="parking-slots">
          <span className="text-xl">🚗</span>
          {parkingSlots.map((slot, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={slot}
              onChange={(e) => handleSlotChange(index, e.target.value)}
              className="slot-input"
            />
          ))}
        </div>
        
        <button
          onClick={handleSubmit}
          className="add-user-btn"
        >
          Add user
        </button>
      </div>

      {/* Bakgrundsbokstaven */}
      <div className="background-text">P</div>
    </div>
  );
};

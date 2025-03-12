import React, { useState } from "react";

const Home = () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Jafry Parking App</h1>
      
      <div className="flex items-center mb-2">
        <span className="text-xl mr-2">👤</span>
        <input
          type="text"
          placeholder="Enter name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      
      <div className="mb-2">
        <input
          type="text"
          placeholder="Enter vehicle details"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      
      <div className="flex items-center mb-4">
        <span className="text-xl mr-2">🚗</span>
        {parkingSlots.map((slot, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={slot}
            onChange={(e) => handleSlotChange(index, e.target.value)}
            className="border p-2 w-10 text-center mx-1"
          />
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        className="bg-gray-400 px-4 py-2 rounded text-white cursor-pointer hover:bg-gray-500"
      >
        Add user
      </button>
      
      <div className="absolute bottom-10 text-gray-200 text-9xl font-bold opacity-20">P</div>
    </div>
  );
};

export default Home;

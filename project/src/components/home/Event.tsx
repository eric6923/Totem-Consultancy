import React from "react";
import Event1 from "../home/assets/event.png";

const Event: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-[#FDF8F3] py-12 px-6 min-h-screen">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">Event Management</h1>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-4xl">
        <img
          src={Event1}
          alt="Event Management"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Event;

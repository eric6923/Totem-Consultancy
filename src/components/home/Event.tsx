import React from "react";
import EventImage from "../home/assets/event.png";
import PricingIcon from "../home/assets/pricing-icon.jpg";
import DesignIcon from "../home/assets/design.svg";
import MilestoneIcon from "../home/assets/milestone.svg";

const Event: React.FC = () => {
  return (
    <div className="py-12 px-6 bg-[#FDF8F3] min-h-screen">
      {/* Title Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl text-gray-900 md:text-5xl font-bold">Event Management</h1>
      </div>

      {/* Image Section */}
      <div className="text-center mt-8">
        <img
          src={EventImage}
          alt="Event Management"
          className="w-full object-cover rounded-2xl"
        />
      </div>

      {/* Features Section */}
      <div className="bg-[#FFEFD2] p-8 text-black w-full flex flex-col md:flex-row justify-between items-start rounded-2xl mt-20 mb-20 space-y-8 md:space-y-0 md:space-x-8">
        {/* Easy Peasy Pricing */}
        
        <div className="flex items-center space-x-6 w-full md:w-1/3">
          <img
            src={PricingIcon}
            alt="Pricing Icon"
            className="w-20 h-20"
          />
          <div>
            <h3 className="text-2xl font-semibold">Easy Peasy Pricing</h3>
            <p className="mt-4 text-lg">
              Stop going cross-eyed over complex pricing tiers. Our pricing plans are so easy, a kindergartener could understand them.
            </p>
          </div>
        </div>

        {/* Unique Design */}
        <div className="flex items-center space-x-6 w-full md:w-1/3">
          <img
            src={DesignIcon}
            alt="Design Icon"
            className="w-20 h-20"
          />
          <div>
            <h3 className="text-2xl font-semibold">Unique Design</h3>
            <p className="mt-4 text-lg">
              There are no cookie-cutter designs here. Your branding, ads, and website will stand out from the competition.
            </p>
          </div>
        </div>

        {/* Achieve Milestone */}
        <div className="flex items-center space-x-6 w-full md:w-1/3">
          <img
            src={MilestoneIcon}
            alt="Milestone Icon"
            className="w-20 h-20"
          />
          <div>
            <h3 className="text-2xl font-semibold">Achieve Milestone</h3>
            <p className="mt-4 text-lg">
              Achieve remarkable milestones with us through creativity, and strategic coordination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;

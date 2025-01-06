import d37 from "../Courses/assets/d37.png";
import d38 from "../Courses/assets/d38.png";
import d39 from "../Courses/assets/d39.png";
import d40 from "../Courses/assets/d40.png";
import digital from "../Courses/assets/courses.png";
import {Link} from 'react-router-dom'
import { useEffect } from "react";
const DigitalMarketingSection = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const services = [
    {
      icon: d37,
      title: "Digital Marketing",
      description:
        "By leveraging data-driven strategies and cutting-edge technology, we help businesses reach a targeted audience, engage with customers, and drive conversions more efficiently than traditional methods. ",
      iconSize: "w-24 h-24",
    },
    {
      icon: d38,
      title: "Graphics Design",
      description:
        "By leveraging data-driven strategies and cutting-edge technology, we help businesses reach a targeted audience, engage with customers, and drive conversions more efficiently than traditional methods. ",
      iconSize: "w-14 h-14",
    },
    {
      icon: d39,
      title: "Video Editing",
      description:
        "By leveraging data-driven strategies and cutting-edge technology, we help businesses reach a targeted audience, engage with customers, and drive conversions more efficiently than traditional methods. ",
      iconSize: "w-14 h-14",
    },
    {
      icon: d40,
      title: "Animation",
      description:
        "By leveraging data-driven strategies and cutting-edge technology, we help businesses reach a targeted audience, engage with customers, and drive conversions more efficiently than traditional methods. ",
      iconSize: "w-14 h-14",
    },
  ];

  return (
    <div className="flex flex-col bg-[#FDF8F3]">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-8 bg-[#FAF9F6] md:ml-16">
        {/* Image now comes first on mobile */}
        <div className="w-[250px] md:w-[408.89px] h-auto md:h-[269.97px] mt-8 md:mt-16 md:mr-16 order-first md:order-last">
          <img
            src={digital}
            alt="Digital Marketing Illustration"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-full md:w-[612px] h-auto md:h-[223px] flex flex-col justify-center px-4 md:px-0 mt-8 md:mt-0">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left">
            Customized Courses
          </h2>
          <p className="text-gray-600 leading-relaxed text-center md:text-justify mt-4 md:mt-6 text-sm md:text-base">
            "By leveraging data-driven strategies and cutting-edge technology,
            we help businesses reach a targeted audience, engage with customers,
            and drive conversions more efficiently than traditional methods. our
            services pack a serious punch, from award-winning web design and
            social media marketing to unique branding and Digital marketing just
            for your startup."
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-32 mt-24 md:mt-48 mb-16 md:mb-24">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-full md:w-[595px] h-auto md:h-[340px] bg-[#FDF8F3] border-2 border-gray-300 rounded-tr-3xl p-4 md:p-6 relative group hover:bg-white hover:scale-105 transition-transform duration-300 mt-12 md:mt-5"
          >
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-[#F6DCAB] absolute top-0 left-1/2 transform -translate-x-1/2 -mt-12 md:-mt-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img
                alt={`${service.title} Icon`}
                className={`${service.iconSize} object-cover transform transition-transform duration-300`}
                src={service.icon}
              />
            </div>
            <h3 className="text-2xl md:text-4xl font-semibold text-center mt-16">
              {service.title}
            </h3>
            <p className="text-base md:text-lg text-gray-800 text-center mt-4 md:mt-8">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 px-4 mb-24">
        {/* <button className="w-60 md:w-48 bg-[#333333] text-[#D4B996] py-3 px-6 rounded">
          View Pricing
        </button> */}
        <Link
          to="/pricing"
          className="w-60 md:w-48 bg-[#333333] text-[#D4B996] py-3 px-6 rounded text-center"
        >
          View Pricing
        </Link>
      </div>
    </div>
  );
};

export default DigitalMarketingSection;

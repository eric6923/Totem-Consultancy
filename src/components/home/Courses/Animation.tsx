import d1 from "../Courses/assets/d1.png";
import d2 from "../Courses/assets/d2.png";
import d3 from "../Courses/assets/d3.png";
import d4 from "../Courses/assets/d4.png";
import d5 from "../Courses/assets/d5.png";
import d6 from "../Courses/assets/d6.png";
import digital from "../Courses/assets/digital.png";

const DigitalMarketingSection = () => {
  const services = [
    {
      icon: d1,
      title: "Branding and Logo Design",
      description:
        "Our branding and logo design services create distinctive identities that leave a lasting impact. We create logos and brand elements that effectively communicate your values and set your company out in the marketplace.",
      iconSize: "w-24 h-24",
    },
    {
      icon: d2,
      title: "Content Marketing",
      description:
        "Our content marketing services create effective, engaging contents that attract and maintain your target audience. We create important assets that increase your brand's credibility and growth.",
      iconSize: "w-14 h-14",
    },
    {
      icon: d3,
      title: "SEO and Google Ads (PPC)",
      description:
        "Improve your brand's visibility with our experienced SEO and targeted Google Ads services. Improve your web visibility and attract more customers effectively.",
      iconSize: "w-14 h-14",
    },
    {
      icon: d4,
      title: "Social Media Marketing",
      description:
        "Boost your brand's visibility with our creative social media marketing techniques. Connect with, engage, and expand your audience on all major platforms.",
      iconSize: "w-14 h-14",
    },
    {
      icon: d5,
      title: "E-commerce Marketing",
      description:
        "Our complete e-commerce marketing solutions will increase sales and visibility for your online store. Optimize your strategy for optimal customer acquisition, conversion, and retention.",
      iconSize: "w-14 h-14",
    },
    {
      icon: d6,
      title: "AdSense Marketing",
      description:
        "Take advantage of our focused AdSense marketing techniques to increase your revenue. For improved ad effectiveness, monetize your website wisely and draw in high-quality traffic.",
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left">Digital Marketing</h2>
          <p className="text-gray-600 leading-relaxed text-center md:text-justify mt-4 md:mt-6 text-sm md:text-base">
            "Our digital marketing services develop tailored plans to increase
            your online presence and engagement. We employ new approaches to
            increase traffic, improve visibility, and generate demonstrable
            outcomes."
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
        <button className="w-60 md:w-48 bg-[#333333] text-[#D4B996] py-3 px-6 rounded">
          Get In Touch
        </button>
        <button className="w-60 md:w-48 bg-[#333333] text-[#D4B996] py-3 px-6 rounded">
          Link to Work
        </button>
      </div>
    </div>
  );
};

export default DigitalMarketingSection;
// import { Send } from 'lucide-react';
import img from './assets/digitalmarketing.gif'
import img1 from './assets/graphic.gif'
import img2 from './assets/video.gif'
import img3 from './assets/ui.gif'
import img4 from './assets/animation.gif'
import img5 from './assets/courses.gif'
// import img6 from '../components/about/assets/Group 9099.png'
// import img7 from '../components/about/assets/Group 9099 (1).png'
// import img8 from '../components/about/assets/Group 9099 (2).png'
// import img9 from '../components/about/assets/Group 9099 (3).png'
import img10 from './assets/Rectangle 182.png'
import img11 from './assets/Rectangle 183.png'
import img12 from './assets/Rectangle 184.png'
import img13 from './assets/Rectangle 185.png'
import img14 from './assets/Mask group.png'
import img15 from './assets/Mask group (1).png'
import img16 from './assets/Mask group (2).png'
import img17 from './assets/Mask group (3).png'
import vid from './assets/-c828-4e00-a8e4-183c9a79137c.mp4'
import img18 from  './assets/brain.png'

const About = () => {
  const values = [
    {
      title: "Diversity",
      description: "We believe in the power of diverse perspectives and experiences in our work and creativity. By fostering an inclusive environment, we ensure that every voice is heard and valued, leading to stronger, more dynamic solutions.",
    },
    {
      title: "Efficiency",
      description: "Our commitment to efficiency ensures optimal resource utilization. Through streamlined processes and advanced tools, we optimize productivity without compromising on excellence.",
    },
    {
      title: "Teamwork & Collaboration",
      description: "Collaboration is at the heart of everything we do. By working closely together, we create an environment where all team members contribute to delivering exceptional outcomes for our clients.",
    },
    {
      title: "Client Value Creation",
      description: "We are dedicated to creating long-term value for our clients through innovative and result-driven strategies. Our success is measured by our clients' success, and we go the extra mile to ensure their growth and satisfaction.",
    },
  ];

  const team = [
    { name: "Parveen Sharma", role: "CEO", img: img13 },
    { name: "Arupama Rana", role: "Designer", img: img12 },
    { name: "Chandan Nain", role: "Developer", img: img14 },
    { name: "Ashok", role: "Digital Manager", img: img10 },
    { name: "Rinku Bhargava", role: "Video Editor", img: img11 },
    { name: "Khushi Parashar", role: "Digital Marketer", img: img15 },
    { name: "Shubham", role: "Graphics Designer", img: img16 },
    { name: "Taryn Sagar", role: "Photographer", img: img17 },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      <section className="container mx-auto px-4 mt-20">
        <div className="w-full bg-[#faf9f6] py-8 md:py-16">
          <div className="container mx-auto flex flex-col items-center justify-center px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-6xl">
              <div className="flex flex-col w-full md:w-[476px] md:h-[236px]">
                <h2 className="text-[#333333] mb-8 text-3xl md:text-[44px] font-semibold leading-tight md:leading-[62.7px] text-left">
                  About Us
                </h2>
                <p className="text-gray-700 font-normal leading-[28px] text-justify">
                  Established in 2023, Totem Management and Consultancy - Digital marketing Company, Based in Kurukshetra (Haryana), we have a simple mission: to give people and brands complete digital solutions. We provide comprehensive services that are designed to help customers succeed in the digital marketplace, from talent development to branding.
                </p>
              </div>
              <div className="flex items-center justify-center mt-8 md:mt-0">
                <img
                  src={img18}
                  alt="Totem Mask"
                  className="w-[150px] md:w-[200px] h-auto md:h-[271px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-start justify-between mx-auto gap-8 max-w-[824px]">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-[35px] font-semibold mb-4 leading-[28.8px] text-left">
              What we do
            </h2>
            <div className="mb-6">
              <div className="h-1 w-48 bg-gradient-to-r from-yellow-300 to-gray-800"></div>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">
              Totem Management and Consultancy is committed to providing unrivaled
              value to our clients. We are driven by innovation and a commitment to
              quality. We work hard to go above and beyond expectations and reshape
              industry standards with an emphasis on continual improvement.
              <br /><br />
              Empower your brand with tailored digital marketing strategies that drive
              growth, enhance online presence, and connect you with your target
              audience. From SEO to SMM, we ensure measurable results that align with
              your business goals.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <video
              src={vid}
              controls
              className="w-full h-auto md:h-[200px] relative"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mx-auto max-w-[824px]">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={img} alt="Digital Marketing" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-bold mb-2 text-center">Digital Marketing</h3>
            <p className="text-gray-700 text-justify">
              Boost your brand online presence with our data-driven digital marketing
              strategies, including SEO, SMM, etc.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={img1} alt="Graphics Design" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-bold mb-2 text-center">Graphics Design</h3>
            <p className="text-gray-700 text-justify">
              Transform your ideas into stunning visuals with our services. We create
              designs that effectively communicate your brand's message.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={img2} alt="Video Editing" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-bold mb-2 text-center">Video Editing</h3>
            <p className="text-gray-700 text-justify">
              Enhance your footage with our professional video editing services,
              delivering polished, engaging content for any platform.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={img3} alt="UI/UX Design" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-bold mb-2 text-center">UI/UX Design</h3>
            <p className="text-gray-700 text-justify">
              Design accessible and visually appealing interfaces with UI/UX services.
              We focus on creating those designs that enhance engagement & satisfaction.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={img4} alt="Animation" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-bold mb-2 text-center">Animation (2D & 3D)</h3>
            <p className="text-gray-700 text-justify">
              Our 2D and 3D animation services are designed to boost your brand's impact
              by creating visually stunning and highly effective animated content.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={img5} alt="Courses" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-bold mb-2 text-center">Customized Courses</h3>
            <p className="text-gray-700 text-justify">
              Our customized courses are designed to provide you with specialized
              training in key areas of digital and creative industries.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-[824px]">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-[140px] md:w-[191px] h-[140px] md:h-[191px] mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold w-full md:w-[191px] h-auto md:h-[29px]">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
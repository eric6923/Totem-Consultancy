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
import brain from  './assets/brain.png'

const About = () => {
  const services = [
    {
      title: "Digital Marketing",
      description: "Boost your brand online presence with bur data driven digital marketing strategies, including SEO, SMM etc.hj,asvncnb",
      image: img
    },
    {
      title: "Graphics Design",
      description: "Creative design solutions that help convey your brand message.",
      image: img1
    },
    {
      title: "Video Editing",
      description: "Professional video editing services tailored for any platform.",
      image: img2
    },
    {
      title: "UI/UX Design",
      description: "Need-oriented interface design meeting business goals through user insight, wireframing & optimization.",
      image: img3
    },
    {
      title: "Animation (2D & 3D)",
      description: "We create engaging animated content that brings your ideas to life through creative visuals.",
      image: img4
    },
    {
      title: "Customized Courses",
      description: "We create custom online courses that fit your unique needs and goals.",
      image: img5
    }
  ];

  const values = [
    {
      title: "Diversity",
      description: "We believe in the power of diverse perspectives and experiences in our work and creativity. By fostering an inclusive environment, we ensure that every voice is heard and valued, leading to stronger, more dynamic solutions."
    },
    {
      title: "Efficiency",
      description: "Our commitment to efficiency ensures optimal resource utilization. Through streamlined processes and advanced tools, we optimize productivity without compromising on excellence."
    },
    {
      title: "Teamwork & Collaboration",
      description: "Collaboration is at the heart of everything we do. By working closely together, we create an environment where all team members, feeding on each other's strengths, contribute to delivering exceptional outcomes for our clients."
    },
    {
      title: "Client Value Creation",
      description: "We are dedicated to creating long-term value for our clients through innovative and result-driven strategies. Our success is measured by our clients' success, and we go the extra mile to ensure their growth and satisfaction."
    }
  ];

  const team = [
    { name: "Parveen Sharma", role: "CEO", img:img13 },
    { name: "Arupama Rana", role: "Designer", img:img12 },
    { name: "Chandan Nain", role: "Developer", img: img14 },
    { name: "Ashok", role: "Digital Manager", img: img10 },
    { name: "Rinku Bhargava", role: "Video Editor", img: img11 },
    { name: "Khushi Parashar", role: "Digital Marketer", img: img15 },
    { name: "Shubham", role: "Graphics Designer", img: img16 },
    { name: "Taryn Sagar", role: "Photographer", img: img17 }
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="text-gray-600">
              Established in 2023, Totem Management and Consultancy is committed to providing sustainable value to our clients. We have a simple mission: to give brands and brands concepts the tools they need to grow in today's market. All our services are designed to help customers succeed in the digital marketplace from client development to branding.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src={brain} alt="Brain Icon" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* What We Do Section with Content */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-5xl font-bold mb-8">What we do</h2>
        <div className="mb-12">
          <div className="h-1 w-48 bg-gradient-to-r from-yellow-300 to-gray-800"></div>
        </div>
        <div className="max-w-3xl mb-16">
          <p className="text-gray-700 text-lg">
            Totem Management and Consultancy is committed to providing unrivaled value to our clients. We are driven by innovation and a commitment to quality. We work hard to go above and beyond expectations and reshape industry standards with an emphasis on continual improvement.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="w-full md:w-1/2">
            <p className="text-gray-700 mb-4">
              Empower your brand with tailored digital marketing strategies that drive growth, enhance online presence, and connect you with your target audience. From SEO to SMM, we ensure measurable results that align with your business goals.
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-blue-900 rounded-lg overflow-hidden">
  <video 
    className="w-full h-64 object-cover" 
    controls
    autoPlay
    muted
    loop
  >
    <source 
      src={vid} 
      type="video/mp4" 
    />
    Your browser does not support the video tag.
  </video>
</div>

        </div>
        <div className="flex flex-wrap justify-center gap-6">
  {services.map((service, index) => (
    <div
      key={index}
      className="bg-white p-4 w-[45%] max-w-[45%] rounded-lg shadow-md flex flex-col items-center"
    >
      <div className="h-28 w-28 mb-4 overflow-hidden rounded-lg">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-center">{service.title}</h3>
      <p className="text-gray-600 text-sm text-center">{service.description}</p>
    </div>
  ))}
</div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold">{member.name}</h3>
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

import Header from '../components/layout/Header'
import Hero from '../components/home/Hero';
import MarketingShowcase from '../components/home/MarketingShowcase';
import Services from '../components/home/Services';
import Course from '../components/home/Course';
import Event from '../components/home/Event';
import Activities from '../components/home/Activities';
import Testimonials from '../components/home/Testimonials';
import video from '../components/home/assets/loading.mp4'
// Video Background Component
const VideoBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute min-w-full min-h-full object-cover"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <source src={video} type="video/mp4"/>
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with Video Background */}
      <div className="relative">
        <VideoBackground />
        <div className="relative z-10">
          <Header />
          <Hero />
        </div>
      </div>

      {/* Rest of the components */}
      <div className="relative bg-white z-10">
        <MarketingShowcase />
        <Services />
        <Course />
        <Event />
        <Activities />
        <Testimonials />
      </div>
    </div>
  );
}
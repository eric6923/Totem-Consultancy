import Course from '../components/home/Course';
import Hero from '../components/home/Hero';
import MarketingShowcase from '../components/home/MarketingShowcase';
import Services from '../components/home/Services';
import Event from '../components/home/Event';
export default function Home() {
  return (
    <div>
      <Hero />
      <MarketingShowcase/>
      <Services />
      <Course/>
      <Event/>
    </div>
  );
}
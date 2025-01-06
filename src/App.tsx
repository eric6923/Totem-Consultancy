import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Header2 from './components/layout/Header2'; // Import the secondary header
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
// import Services from './pages/Services';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import DigitalMarketing from './components/home/Courses/DigitalMarketing';
import Graphics from '../src/components/home/Courses/Graphics'
import Media from '../src/components/home/Courses/Media'
import Animation from '../src/components/home/Courses/Animation'
import CourseHome from '../src/components/home/Courses/CourseHome'
import UI from '../src/components/home/Courses/UI'
// Component to conditionally render headers based on the route
function ConditionalHeader() {
  const location = useLocation(); // Access the current route

  // Use Header for the Home page, and Header2 for other pages
  return location.pathname === '/' ? <Header /> : <Header2 />;
}

// Component to conditionally render the footer
function ConditionalFooter() {
  const location = useLocation(); // Access the current route

  // Do not render Footer for the Contact page
  return location.pathname !== '/contact' ? <Footer /> : null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Conditionally render Header or Header2 */}
        <ConditionalHeader />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/services" element={<Services />} */}

            <Route path="/digital" element={<DigitalMarketing />} />
            <Route path="/graphics" element={<Graphics/>} />
            <Route path="/media" element={<Media />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/courses" element={<CourseHome />} />
            <Route path="/ui" element={<UI />} />
          </Routes>
        </main>
        {/* Conditionally render Footer */}
        <ConditionalFooter />
      </div>
    </Router>
  );
}

export default App;

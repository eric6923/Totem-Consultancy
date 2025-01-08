import Project from "../components/projects/Project";
import WhatsAppButton from "../components/home/WhatsAppButton";
function Projects() {
  return (
    <div className="p-4"> {/* Add padding if needed */}
      <Project />
      <WhatsAppButton/>
    </div>
  );
}

export default Projects;

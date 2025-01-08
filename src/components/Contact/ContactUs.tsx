import { useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  useEffect(() => {
    // Scroll to the top whenever this component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e:any) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const service = form.service.value;
    const message = form.message.value;

    const templateParams = {
      name,
      email,
      service,
      message,
    };

    emailjs
    .send(
      "service_52wf8so", // Replace with your EmailJS service ID
      "template_l889yux", // Replace with your EmailJS template ID
      templateParams,
      "4uNPbbh4mrwY7kIYa" // Replace with your EmailJS public key
    )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          alert("Message sent successfully!");
          form.reset(); // Clear the form fields
        },
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{
        background:
          "radial-gradient(circle at center, #F6DCAB3B 0%, #F6DCAB3B 15%, #3434343B 40%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Right Container - Contact Information */}
          <div
            className="w-full md:w-[574px] order-1 md:order-2 p-8 rounded-lg text-white"
            style={{ backgroundColor: "#343434" }}
          >
            <h2 className="text-4xl font-light mb-6">Let's Talk</h2>
            <p className="mb-8 text-gray-300">
              Have some big idea or brand to develop and need help? Then reach
              out we'd love to hear about your project and provide help.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-light mb-2">Email</h3>
                <p className="text-gray-300">totem@services.org</p>
              </div>
              <div>
                <h3 className="text-xl font-light mb-2">Address</h3>
                <p className="text-gray-300">
                  SCO 10A, Manjha Market, Near Lakshman Chowk,Birala Mandir,
                  Kurukshetra, Haryana
                </p>
              </div>
              <div>
                <h3 className="text-xl font-light mb-2">Social</h3>
                <div className="flex space-x-4">
                  {/* Social Links */}
                </div>
              </div>
            </div>
          </div>

          {/* Left Container - Contact Form */}
          <div className="w-full md:w-[571px] order-2 md:order-1 bg-white p-8 rounded-lg shadow-md">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service you are interested in
                </label>
                <input
                  type="text"
                  id="service"
                  name="service"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

import whatsapp from './whatsapp.png';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918278416000', '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <img
        src={whatsapp}
        alt="WhatsApp Icon"
        className="w-12 h-12"
      />
    </button>
  );
};

export default WhatsAppButton;

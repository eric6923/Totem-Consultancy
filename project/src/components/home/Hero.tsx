export default function Hero() {
  return (
    <div className="bg-black text-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <h1 className="text-7xl font-bold mb-6 leading-tight">
            We Empower Brands and Individuals
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl">
            A one-stop shop for the solution of Digital Marketing, Content Creation, Graphics, Animation, and Customized Courses that demonstrate individuals and brands.
          </p>
          <button className="bg-[#E6D5B9] text-black px-8 py-3 rounded hover:bg-[#d4c3a7] transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
    
  );
}
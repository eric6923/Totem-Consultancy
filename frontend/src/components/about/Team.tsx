import img from './assetsteam/assets/Mask group.png'
import img1 from './assetsteam/assets/Mask group (1).png'
import img2 from './assetsteam/assets/Mask group (2).png'
import img3 from './assetsteam/assets/Mask group (3).png'
import img4 from './assetsteam/assets/Rectangle 182.png'
import img5 from './assetsteam/assets/Rectangle 183.png'
import img6 from './assetsteam/assets/Rectangle 184.png'
import img7 from './assetsteam/assets/Rectangle 185.png'


const Team = () => {
const team = [
    { name: "Parveen Sharma", role: "CEO", img: img7 },
    { name: "Arupama Rana", role: "Designer", img: img6 },
    { name: "Chandan Nain", role: "Developer", img: img5 },
    { name: "Ashok", role: "Digital Manager", img: img4 },
    { name: "Rinku Bhargava", role: "Video Editor", img: img3 },
    { name: "Khushi Parashar", role: "Digital Marketer", img: img2 },
    { name: "Shubham", role: "Graphics Designer", img: img1 },
    { name: "Taryn Sagar", role: "Photographer", img: img },
  ];

  return (
    <section className="py-8 md:py-16 bg-[#faf9f6]">
        <div className="container mx-auto px-4 max-w-[824px] bg-[#faf9f6]">
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
  );
};

export default Team;
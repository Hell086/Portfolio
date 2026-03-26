import { mySocials } from "../constants";
const Footer = () => {
  return (
    <section className="flex flex-col items-center gap-4 pb-3 text-sm text-neutral-400 c-space">
      <div className="mb-4 g bg-gradient-to-r from-transparent via-neutral-400 to-transparent h-[2px] w-full" />
      <div className="flex gap-4">
        {mySocials.map((social, index) => (
          <a href={social.href} key={index}
          className="transition-all duration-300 ease-in-out hover:scale-110 inline-block"
          style={{
            filter: 'grayscale(100%) brightness(0.8)',
            transition: 'all 0.3s ease-in-out'
          }}

           onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(38%) sepia(89%) saturate(2699%) hue-rotate(202deg) brightness(101%) contrast(98%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'grayscale(100%) brightness(0.8)';
            }}
          >
            <img 
              src={social.icon} 
              className="w-5 h-5" 
              alt={social.name}
            />
          </a>
        ))}
      </div>
      <p>© 2026 Binay Shrestha. All rights reserved.</p>
    </section>
  );
};

export default Footer;
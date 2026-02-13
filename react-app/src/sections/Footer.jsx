const Footer = () => {
  const socialLinks = [
    {
      id: 1,
      name: 'GitHub',
      icon: 'fab fa-github',
      link: 'https://github.com/pushkaltoocool',
    },
    {
      id: 2,
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      link: 'https://www.linkedin.com/in/pushkal-vashist-b63224363/',
    },
    {
      id: 3,
      name: 'Kaggle',
      icon: 'fab fa-kaggle',
      link: 'https://www.kaggle.com/pushkalvashist', 
    },
  ];

  return (
    <footer className="c-space pt-10 pb-10 border-t border-white/10 flex justify-between items-center flex-wrap gap-5">
      {/* Left Side: Professional Identity */}
      <div className="text-gray-500 flex flex-col gap-1">
        <p className="text-white-600 font-medium">© 2026 Pushkal Vashist</p>
        <p className="text-xs">Built with React, Three.js & Passion.</p>
      </div>

      {/* Right Side: Social Connections */}
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <a 
            key={social.id} 
            href={social.link} 
            target="_blank" 
            rel="noreferrer"
            className="group"
          >
            <div className="w-12 h-12 rounded-full flex justify-center items-center bg-black-300 border border-black-500 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-all duration-300 shadow-sm">
              <img 
                src={social.icon} 
                alt={social.name} 
                className="w-1/2 h-1/2 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" 
              />
            </div>
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
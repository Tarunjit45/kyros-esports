import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = [
    {
      title: 'Company',
      items: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Support',
      items: [
        { name: 'Help Center', href: '/help' },
        { name: 'Safety Center', href: '/safety' },
        { name: 'Community Guidelines', href: '/guidelines' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/fsnesports', icon: '🐦' },
    { name: 'Instagram', href: 'https://instagram.com/fsnesports', icon: '📷' },
    { name: 'Facebook', href: 'https://facebook.com/fsnesports', icon: '👍' },
    { name: 'Discord', href: 'https://discord.gg/MPsEUn5vQX', icon: '💬' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">KYROS ESPORTS</h3>
            <p className="text-gray-400 mb-6">
              Connecting gamers worldwide through tournaments, scrims, and seasonal matchmaking across various platforms and game titles.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                  aria-label={item.name}
                >
                  <span className="text-2xl">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {links.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest news and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm text-center">
            <p>&copy; {currentYear} KYROS ESPORTS. All rights reserved.</p>
            <p className="text-xs mt-1">
              Developed by <a href="mailto:tarunjitbiswas24@gmail.com" className="text-blue-400 hover:underline">Tarunjit Biswas</a>
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaGamepad, 
  FaUsers, 
  FaCalendarAlt, 
  FaImage, 
  FaCog, 
  FaSignOutAlt, 
  FaChartLine,
  FaNewspaper,
  FaUserCog
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { pathname } = location;

  const navItems = [
    { id: 'dashboard', icon: <FaHome />, label: 'Dashboard', path: '/admin/dashboard' },
    { id: 'content', icon: <FaNewspaper />, label: 'Content', path: '/admin/content' },
    { id: 'games', icon: <FaGamepad />, label: 'Games', path: '/admin/games' },
    { id: 'teams', icon: <FaUsers />, label: 'Teams', path: '/admin/teams' },
    { id: 'events', icon: <FaCalendarAlt />, label: 'Events', path: '/admin/events' },
    { id: 'media', icon: <FaImage />, label: 'Media', path: '/admin/media' },
    { id: 'analytics', icon: <FaChartLine />, label: 'Analytics', path: '/admin/analytics' },
    { id: 'users', icon: <FaUserCog />, label: 'Users', path: '/admin/users' },
    { id: 'settings', icon: <FaCog />, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
        <div className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            KYROS ADMIN
          </span>
        </div>
        <button 
          className="md:hidden text-gray-400 hover:text-white focus:outline-none"
          onClick={onClose}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="px-4 py-6">
        <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>

      <nav className="px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path) || (item.id === 'dashboard' && pathname === '/admin');
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              onClick={onClose}
            >
              <span className={`mr-3 ${isActive ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-400'}`}>
                {item.icon}
              </span>
              {item.label}
              {item.badge && (
                <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-500 text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <button
          className="group w-full flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
          onClick={() => {
            // Handle logout
            localStorage.removeItem('adminToken');
            window.location.href = '/admin/login';
          }}
        >
          <FaSignOutAlt className="mr-3 text-gray-400 group-hover:text-red-400" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaGamepad, FaUsers, FaCalendarAlt, FaSignOutAlt, FaCog, FaImage, FaBell, FaPlus } from 'react-icons/fa';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the current route segment after /admin/
  const currentRoute = location.pathname.split('/').filter(Boolean)[1] || 'home';
  const [activeTab, setActiveTab] = useState(currentRoute);

  // Update active tab when route changes
  useEffect(() => {
    const route = location.pathname.split('/').filter(Boolean)[1] || 'home';
    setActiveTab(route);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'dashboard', icon: <FaHome />, label: 'Dashboard', path: '' },
    { id: 'games', icon: <FaGamepad />, label: 'Games', path: 'games' },
    { id: 'teams', icon: <FaUsers />, label: 'Teams', path: 'teams' },
    { id: 'events', icon: <FaCalendarAlt />, label: 'Events', path: 'events' },
    { id: 'media', icon: <FaImage />, label: 'Media', path: 'media' },
    { id: 'settings', icon: <FaCog />, label: 'Settings', path: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">KYROS Admin</h1>
          <p className="text-sm text-gray-400">Welcome back, Admin</p>
        </div>
        
        <nav className="mt-6">
          {navItems.map((item) => {
            const isActive = location.pathname === `/admin/${item.path}` || 
                           (location.pathname === '/admin' && item.path === '');
            
            return (
              <div
                key={item.id}
                className={`flex items-center px-6 py-3 cursor-pointer transition-colors duration-200 ${
                  isActive ? 'bg-gray-700 text-purple-400' : 'hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  navigate(item.path ? `/admin/${item.path}` : '/admin');
                }}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
          
          <div 
            className="flex items-center px-6 py-3 mt-4 text-red-400 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {navItems.find(item => 
                location.pathname === `/admin/${item.path}` || 
                (location.pathname === '/admin' && item.path === '')
              )?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none relative">
                <FaBell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample data for the dashboard
  const stats = [
    { name: 'Total Games', value: '5', change: '+2', changeType: 'increase' },
    { name: 'Active Teams', value: '12', change: '+3', changeType: 'increase' },
    { name: 'Upcoming Events', value: '7', change: '+1', changeType: 'increase' },
    { name: 'Active Users', value: '1,234', change: '+12%', changeType: 'increase' },
  ];

  const recentActivities = [
    { id: 1, type: 'game', action: 'added', title: 'Valorant', time: '2 minutes ago' },
    { id: 2, type: 'team', action: 'updated', title: 'Team Phoenix', time: '1 hour ago' },
    { id: 3, type: 'event', action: 'scheduled', title: 'Summer Tournament', time: '3 hours ago' },
    { id: 4, type: 'user', action: 'registered', title: 'New admin user', time: '1 day ago' },
  ];

  const quickActions = [
    { icon: <FaPlus className="mr-2" />, label: 'Add New Game', path: '/admin/games' },
    { icon: <FaUsers className="mr-2" />, label: 'Manage Teams', path: '/admin/teams' },
    { icon: <FaCalendarAlt className="mr-2" />, label: 'Schedule Event', path: '/admin/events' },
    { icon: <FaImage className="mr-2" />, label: 'Upload Media', path: '/admin/media' },
    {
      title: 'Site Settings',
      description: 'Update site title, logo, and appearance',
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      action: () => navigate('/admin/settings'),
      color: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Analytics',
      description: 'View site traffic and user engagement',
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      action: () => navigate('/admin/analytics'),
      color: 'bg-green-100 dark:bg-green-900/30',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h3>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action, index) => (
          <div 
            key={index}
            onClick={action.action}
            className={`${action.color} p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer transition-all hover:shadow-md hover:-translate-y-1`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {action.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{action.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{action.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: 'Total Visitors', value: '24,541', change: '+12%', changeType: 'increase' },
          { name: 'Active Users', value: '1,248', change: '+8.2%', changeType: 'increase' },
          { name: 'Total Content', value: '47', change: '+5', changeType: 'increase' },
        ].map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-md bg-purple-100 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {[
              { id: 1, action: 'Updated homepage banner', time: '2 minutes ago', user: 'Admin' },
              { id: 2, action: 'Added new tournament', time: '1 hour ago', user: 'Admin' },
              { id: 3, action: 'Updated team roster', time: '3 hours ago', user: 'Admin' },
            ].map((activity) => (
              <li key={activity.id} className="px-6 py-4">
                <div className="flex items-center">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="min-w-0 flex-1">
                      <div>
                        <p className="text-sm font-medium text-purple-600 truncate">
                          {activity.action}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {activity.time} • {activity.user}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { AdminLayout, Dashboard };

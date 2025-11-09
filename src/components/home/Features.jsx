import React from 'react';
import { ChartBarIcon, UserGroupIcon, TrophyIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { FaDiscord, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <ChartBarIcon className="h-10 w-10 text-blue-500" />,
      title: 'Engaging the Community',
      description: 'Posting and promoting content, tutorials, news, and podcasts on social media to help casual gamers and viewers ease into the esports scene.'
    },
    {
      icon: <UserGroupIcon className="h-10 w-10 text-purple-500" />,
      title: 'Collaborative Approach',
      description: 'Working with other content creators and game developers directly to engage with their audiences and grow together.'
    },
    {
      icon: <TrophyIcon className="h-10 w-10 text-yellow-500" />,
      title: 'Developing the Esports Scene',
      description: 'Hosting events, matchmaking, tournaments, and more to directly grow and nurture the player base.'
    },
    {
      icon: <ChatBubbleLeftRightIcon className="h-10 w-10 text-green-500" />,
      title: '24/7 Support',
      description: 'Our dedicated support team is always available to help you with any questions or issues you might have.'
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose KYROS ESPORTS?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're building more than just a gaming platform - we're creating a community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all duration-300">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join Our Growing Community
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto mb-6">
            Be part of the fastest growing gaming community with over 18,000+ members and counting.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://discord.gg/K8ynexKn5f"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 hover:bg-gray-100 font-medium px-8 py-3 rounded-full transition-all duration-200 text-lg flex items-center justify-center gap-2"
            >
              <FaDiscord className="w-5 h-5" />
              <span>Join Discord</span>
            </a>
          </div>
          
          <div className="mt-8 flex justify-center gap-6">
            <a
              href="https://twitch.tv/kyrosesports"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition-colors duration-200"
              aria-label="Twitch"
            >
              <FaTwitch className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/kyrosesports"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com/kyrosesports"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors duration-200"
              aria-label="YouTube"
            >
              <FaYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

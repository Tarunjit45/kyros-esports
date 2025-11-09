import React from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'CODM Tournament',
      date: 'Nov 20, 2025',
      prize: '$5,000',
      game: 'codm',
      image: '/images/codm-tournament.jpg',
      description: 'Join the ultimate Call of Duty: Mobile tournament and compete for a $5,000 prize pool!'
    },
    {
      id: 2,
      title: 'Valorant Championship',
      date: 'Dec 5, 2025',
      prize: '$10,000',
      game: 'valorant',
      image: '/images/valorant-championship.jpg',
      description: 'The biggest Valorant tournament of the year with a massive $10,000 prize pool!'
    },
    {
      id: 3,
      title: 'Free Fire Tournament',
      date: 'Jan 10, 2026',
      prize: '$7,500',
      game: 'freefire',
      image: '/images/freefire-tournament.jpg',
      description: 'Battle Royale action in the ultimate Free Fire tournament with a $7,500 prize pool!'
    }
  ];

  return (
    <section id="events" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our exciting tournaments and compete with the best players
            from around the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 bg-gray-800 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `data:image/svg+xml;charset=UTF-8,%3Csvg width='100%25' height='100%25' viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%232d3748'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%23a0aec0' text-anchor='middle' dominant-baseline='middle'%3E${event.title}%3C/text%3E%3C/svg%3E`;
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-400">{event.date}</p>
                  </div>
                  <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {event.prize} Prize
                  </span>
                </div>
                <div className="mt-6">
                  <a
                    href="https://discord.gg/K8ynexKn5f"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 w-full text-center"
                  >
                    <FaDiscord className="w-5 h-5" />
                    <span>Join on Discord</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/events"
            className="inline-flex items-center text-blue-400 hover:text-white"
          >
            View All Events
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events;

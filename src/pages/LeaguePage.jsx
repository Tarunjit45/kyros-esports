import React from 'react';
import { motion } from 'framer-motion';

export default function LeaguePage() {
  const teams = [
    { id: 1, name: 'SKT T1', wins: 12, losses: 2, region: 'Korea', logo: '/assets/images/teams/skt.png' },
    { id: 2, name: 'G2 Esports', wins: 11, losses: 3, region: 'Europe', logo: '/assets/images/teams/g2.png' },
    { id: 3, name: 'Cloud9', wins: 10, losses: 4, region: 'North America', logo: '/assets/images/teams/c9.png' },
    { id: 4, name: 'Fnatic', wins: 9, losses: 5, region: 'Europe', logo: '/assets/images/teams/fnatic.png' },
    { id: 5, name: 'T1', wins: 8, losses: 6, region: 'Korea', logo: '/assets/images/teams/t1.png' },
  ];

  const upcomingMatches = [
    { id: 1, team1: 'SKT T1', team2: 'G2 Esports', time: '2023-12-15T19:00:00', tournament: 'Worlds 2023' },
    { id: 2, team1: 'Cloud9', team2: 'Fnatic', time: '2023-12-17T20:30:00', tournament: 'Worlds 2023' },
    { id: 3, team1: 'T1', team2: 'DWG KIA', time: '2023-12-20T18:00:00', tournament: 'LCK Summer' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-900"
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">LEAGUE OF LEGENDS</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Experience the pinnacle of competitive League of Legends. Join our tournaments and compete against the best players worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">Join Tournament</button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors">
                Watch Live
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl transform rotate-6"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">Championship Standings</h3>
                <div className="space-y-4">
                  {teams.slice(0, 3).map((team, index) => (
                    <div key={team.id} className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-gray-400 w-6 text-center">{index + 1}</span>
                        <div className="w-8 h-8 bg-gray-700 rounded-full mr-3"></div>
                        <div>
                          <div className="font-medium text-white">{team.name}</div>
                          <div className="text-xs text-gray-400">{team.region}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">{team.wins} - {team.losses}</div>
                        <div className="text-xs text-gray-400">W-L</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300">
                  View Full Standings →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Upcoming Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors">
                <div className="text-sm text-blue-400 mb-3">{match.tournament}</div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
                    <span className="font-medium text-white">{match.team1}</span>
                  </div>
                  <span className="px-3 py-1 bg-gray-700 text-sm rounded">VS</span>
                  <div className="flex items-center">
                    <span className="font-medium text-white mr-3">{match.team2}</span>
                    <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(match.time).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                  Set Reminder
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Champions Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Featured Champions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {['Yasuo', 'Lux', 'Zed', 'Ahri', 'Jinx'].map((champion, index) => (
              <motion.div 
                key={champion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white">{champion}</h3>
                  <p className="text-sm text-gray-300">The Unforgiven</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-0">
                  <div className="w-32 h-32 bg-blue-500/20 rounded-full filter blur-3xl"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Join Community */}
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-900/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Join the League Community</h2>
            <p className="text-gray-300 mb-8">
              Connect with other League of Legends players, find teammates, and stay updated on the latest tournaments and events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Join Discord
              </button>
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                Follow on Twitter
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

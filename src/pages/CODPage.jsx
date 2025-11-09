import React from 'react';
import { motion } from 'framer-motion';

export default function CODPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">CALL OF DUTY</span>
              <span className="block text-2xl md:text-3xl text-gray-400 mt-2">MOBILE</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the ultimate mobile FPS competition. Join our CODM tournaments and battle for glory and prizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">Join Tournament</button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors">
                View Leaderboard
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl transform rotate-6"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">Featured Tournament</h3>
                <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-yellow-400 font-medium">CODM World Championship</span>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">LIVE</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>32 Teams</span>
                    <span>Prize Pool: $25,000</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>75% Complete</span>
                    <span>8 Matches Remaining</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
                  Watch Live
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Tournament Schedule</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tournament</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Prize Pool</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Teams</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  { id: 1, name: 'CODM World Championship', date: '2023-12-10', prize: '$25,000', teams: 32, status: 'Upcoming' },
                  { id: 2, name: 'Mobile Mayhem', date: '2023-12-17', prize: '$15,000', teams: 24, status: 'Upcoming' },
                  { id: 3, name: 'Battle Royale Showdown', date: '2023-12-24', prize: '$10,000', teams: 16, status: 'Upcoming' },
                  { id: 4, name: 'Sniper Elite', date: '2024-01-07', prize: '$7,500', teams: 16, status: 'Registration Open' },
                ].map((tournament) => (
                  <tr key={tournament.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{tournament.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {new Date(tournament.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-yellow-400">{tournament.prize}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{tournament.teams} Teams</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tournament.status === 'Upcoming' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {tournament.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-red-400 hover:text-red-300">Register →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Join the CODM Community</h2>
            <p className="text-gray-300 mb-8">
              Connect with fellow players, form teams, and stay updated on the latest tournaments and events in the CODM competitive scene.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
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

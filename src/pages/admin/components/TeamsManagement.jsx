import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase/config';
import { FaEdit, FaTrash, FaPlus, FaImage, FaSave, FaTimes, FaUserPlus } from 'react-icons/fa';

const TeamsManagement = () => {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState({ teams: true, games: true });
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    gameId: '',
    logo: null,
    logoPreview: '',
    description: '',
    members: [{ name: '', role: 'Player', social: { twitter: '', twitch: '' } }],
    social: {
      twitter: '',
      instagram: '',
      twitch: ''
    },
    status: 'active'
  });

  // Load teams and games
  useEffect(() => {
    const unsubscribeTeams = onSnapshot(collection(db, 'teams'), (snapshot) => {
      const teamsList = [];
      snapshot.forEach((doc) => {
        teamsList.push({ id: doc.id, ...doc.data() });
      });
      setTeams(teamsList);
      setLoading(prev => ({ ...prev, teams: false }));
    });

    const unsubscribeGames = onSnapshot(collection(db, 'games'), (snapshot) => {
      const gamesList = [];
      snapshot.forEach((doc) => {
        gamesList.push({ id: doc.id, ...doc.data() });
      });
      setGames(gamesList);
      setLoading(prev => ({ ...prev, games: false }));
    });

    return () => {
      unsubscribeTeams();
      unsubscribeGames();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.members];
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      updatedMembers[index] = {
        ...updatedMembers[index],
        [parent]: {
          ...updatedMembers[index][parent],
          [child]: value
        }
      };
    } else {
      updatedMembers[index] = {
        ...updatedMembers[index],
        [name]: value
      };
    }
    
    setFormData({
      ...formData,
      members: updatedMembers
    });
  };

  const addMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, { name: '', role: 'Player', social: { twitter: '', twitch: '' } }]
    });
  };

  const removeMember = (index) => {
    const updatedMembers = formData.members.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      members: updatedMembers
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        logo: file,
        logoPreview: URL.createObjectURL(file)
      });
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `teams/logos/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const logoUrl = formData.logo ? await uploadImage(formData.logo) : formData.logoPreview;
      
      const teamData = {
        name: formData.name,
        gameId: formData.gameId,
        logoUrl,
        description: formData.description,
        members: formData.members.filter(member => member.name.trim() !== ''),
        social: formData.social,
        status: formData.status,
        updatedAt: new Date().toISOString()
      };

      if (editingTeam) {
        await updateDoc(doc(db, 'teams', editingTeam.id), teamData);
      } else {
        await addDoc(collection(db, 'teams'), {
          ...teamData,
          createdAt: new Date().toISOString()
        });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving team:', error);
    }
  };

  const editTeam = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      gameId: team.gameId,
      logo: null,
      logoPreview: team.logoUrl || '',
      description: team.description || '',
      members: team.members?.length ? team.members : [{ name: '', role: 'Player', social: { twitter: '', twitch: '' } }],
      social: team.social || { twitter: '', instagram: '', twitch: '' },
      status: team.status || 'active'
    });
  };

  const deleteTeam = async (id) => {
    if (window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'teams', id));
      } catch (error) {
        console.error('Error deleting team:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      gameId: '',
      logo: null,
      logoPreview: '',
      description: '',
      members: [{ name: '', role: 'Player', social: { twitter: '', twitch: '' } }],
      social: {
        twitter: '',
        instagram: '',
        twitch: ''
      },
      status: 'active'
    });
    setEditingTeam(null);
  };

  if (loading.teams || loading.games) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Teams Management</h2>
        <button
          onClick={resetForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Team
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Game</label>
              <select
                name="gameId"
                value={formData.gameId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a game</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Logo</label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                <FaImage className="inline-block mr-2" />
                {formData.logo ? 'Change Logo' : 'Upload Logo'}
                <input type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
              </label>
              {formData.logoPreview && (
                <div className="ml-4 relative">
                  <img src={formData.logoPreview} alt="Team Logo" className="h-16 w-16 object-cover rounded-full" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logo: null, logoPreview: '' })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Team Members</label>
              <button
                type="button"
                onClick={addMember}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <FaUserPlus className="mr-1" /> Add Member
              </button>
            </div>
            
            {formData.members.map((member, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg relative">
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Remove member"
                >
                  <FaTimes />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Member name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      name="role"
                      value={member.role}
                      onChange={(e) => handleMemberChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Player">Player</option>
                      <option value="Captain">Captain</option>
                      <option value="Coach">Coach</option>
                      <option value="Manager">Manager</option>
                      <option value="Substitute">Substitute</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                    <input
                      type="text"
                      name="social.twitter"
                      value={member.social?.twitter || ''}
                      onChange={(e) => handleMemberChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Twitter username"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitch</label>
                    <input
                      type="text"
                      name="social.twitch"
                      value={member.social?.twitch || ''}
                      onChange={(e) => handleMemberChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Twitch username"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    twitter.com/
                  </span>
                  <input
                    type="text"
                    name="social.twitter"
                    value={formData.social.twitter}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    instagram.com/
                  </span>
                  <input
                    type="text"
                    name="social.instagram"
                    value={formData.social.instagram}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitch</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    twitch.tv/
                  </span>
                  <input
                    type="text"
                    name="social.twitch"
                    value={formData.social.twitch}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaSave className="inline-block mr-1" />
              {editingTeam ? 'Update Team' : 'Add Team'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Teams List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage all teams in your system</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No teams found. Add your first team to get started.
                  </td>
                </tr>
              ) : (
                teams.map((team) => {
                  const game = games.find(g => g.id === team.gameId);
                  return (
                    <tr key={team.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.logoUrl && (
                          <img src={team.logoUrl} alt={team.name} className="h-10 w-10 rounded-full object-cover" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{team.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{team.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{game?.title || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{team.members?.length || 0} members</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          team.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {team.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => editTeam(team)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <FaEdit className="inline-block" />
                        </button>
                        <button
                          onClick={() => deleteTeam(team.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="inline-block" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamsManagement;

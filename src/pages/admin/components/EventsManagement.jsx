import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase/config';
import { FaEdit, FaTrash, FaPlus, FaImage, FaSave, FaTimes, FaCalendarAlt, FaGamepad, FaUsers, FaTrophy } from 'react-icons/fa';
import { format } from 'date-fns';

const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [games, setGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState({ events: true, games: true, teams: true });
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    gameId: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    type: 'tournament', // 'tournament', 'match', 'meetup', etc.
    status: 'upcoming', // 'upcoming', 'ongoing', 'completed', 'cancelled'
    image: null,
    imagePreview: '',
    prizePool: '',
    registrationLink: '',
    participants: [],
    bracket: null,
    rules: '',
    streamLink: ''
  });

  // Load events, games, and teams
  useEffect(() => {
    const unsubscribeEvents = onSnapshot(
      query(collection(db, 'events'), orderBy('startDate', 'desc')), 
      (snapshot) => {
        const eventsList = [];
        snapshot.forEach((doc) => {
          eventsList.push({ id: doc.id, ...doc.data() });
        });
        setEvents(eventsList);
        setLoading(prev => ({ ...prev, events: false }));
      }
    );

    const unsubscribeGames = onSnapshot(collection(db, 'games'), (snapshot) => {
      const gamesList = [];
      snapshot.forEach((doc) => {
        gamesList.push({ id: doc.id, ...doc.data() });
      });
      setGames(gamesList);
      setLoading(prev => ({ ...prev, games: false }));
    });

    const unsubscribeTeams = onSnapshot(collection(db, 'teams'), (snapshot) => {
      const teamsList = [];
      snapshot.forEach((doc) => {
        teamsList.push({ id: doc.id, ...doc.data() });
      });
      setTeams(teamsList);
      setLoading(prev => ({ ...prev, teams: false }));
    });

    return () => {
      unsubscribeEvents();
      unsubscribeGames();
      unsubscribeTeams();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleParticipantChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      participants: options
    });
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `events/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = formData.image ? await uploadImage(formData.image) : formData.imagePreview;
      
      const eventData = {
        title: formData.title,
        gameId: formData.gameId,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: formData.location,
        type: formData.type,
        status: formData.status,
        imageUrl,
        prizePool: formData.prizePool,
        registrationLink: formData.registrationLink,
        participants: formData.participants,
        rules: formData.rules,
        streamLink: formData.streamLink,
        updatedAt: new Date().toISOString()
      };

      if (editingEvent) {
        await updateDoc(doc(db, 'events', editingEvent.id), eventData);
      } else {
        await addDoc(collection(db, 'events'), {
          ...eventData,
          createdAt: new Date().toISOString()
        });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const editEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      gameId: event.gameId,
      description: event.description || '',
      startDate: event.startDate ? format(new Date(event.startDate), "yyyy-MM-dd'T'HH:mm") : '',
      endDate: event.endDate ? format(new Date(event.endDate), "yyyy-MM-dd'T'HH:mm") : '',
      location: event.location || '',
      type: event.type || 'tournament',
      status: event.status || 'upcoming',
      image: null,
      imagePreview: event.imageUrl || '',
      prizePool: event.prizePool || '',
      registrationLink: event.registrationLink || '',
      participants: event.participants || [],
      rules: event.rules || '',
      streamLink: event.streamLink || ''
    });
  };

  const deleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'events', id));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      gameId: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      type: 'tournament',
      status: 'upcoming',
      image: null,
      imagePreview: '',
      prizePool: '',
      registrationLink: '',
      participants: [],
      rules: '',
      streamLink: ''
    });
    setEditingEvent(null);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      tournament: <FaTrophy className="inline-block mr-1" />,
      match: <FaGamepad className="inline-block mr-1" />,
      meetup: <FaUsers className="inline-block mr-1" />
    };
    
    return icons[type] || <FaCalendarAlt className="inline-block mr-1" />;
  };

  if (loading.events || loading.games || loading.teams) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events Management</h2>
        <button
          onClick={resetForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Event
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                min={formData.startDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="tournament">Tournament</option>
                <option value="match">Match</option>
                <option value="meetup">Meetup</option>
                <option value="workshop">Workshop</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prize Pool</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="prizePool"
                  value={formData.prizePool}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location / Platform</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Online, Venue Name, or Platform"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                <FaImage className="inline-block mr-2" />
                {formData.image ? 'Change Image' : 'Upload Image'}
                <input type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
              </label>
              {formData.imagePreview && (
                <div className="ml-4 relative">
                  <img src={formData.imagePreview} alt="Event" className="h-16 w-16 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: null, imagePreview: '' })}
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
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Provide details about the event..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rules</label>
            <textarea
              name="rules"
              value={formData.rules}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="List the rules for the event..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Link</label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://example.com/register"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stream Link</label>
              <input
                type="url"
                name="streamLink"
                value={formData.streamLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://twitch.tv/yourchannel"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Participants (Select multiple with Ctrl/Cmd)</label>
            <select
              multiple
              name="participants"
              value={formData.participants}
              onChange={handleParticipantChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
            >
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {formData.participants.length} {formData.participants.length === 1 ? 'team' : 'teams'} selected
            </p>
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
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Events List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage all events in your system</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No events found. Create your first event to get started.
                  </td>
                </tr>
              ) : (
                events.map((event) => {
                  const game = games.find(g => g.id === event.gameId);
                  const startDate = event.startDate ? new Date(event.startDate) : null;
                  const endDate = event.endDate ? new Date(event.endDate) : null;
                  
                  return (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {event.imageUrl && (
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full object-cover" src={event.imageUrl} alt={event.title} />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                            <div className="text-sm text-gray-500">{event.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{game?.title || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {startDate ? (
                          <div className="text-sm text-gray-900">
                            <div>{format(startDate, 'MMM d, yyyy')}</div>
                            <div className="text-gray-500">{format(startDate, 'h:mm a')} - {endDate ? format(endDate, 'h:mm a') : 'TBD'}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">TBD</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">
                          {getEventTypeIcon(event.type)}
                          {event.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(event.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => editEvent(event)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          title="Edit"
                        >
                          <FaEdit className="inline-block" />
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
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

export default EventsManagement;

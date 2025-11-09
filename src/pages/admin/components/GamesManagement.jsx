import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase/config';
import { FaEdit, FaTrash, FaPlus, FaImage, FaSave, FaTimes } from 'react-icons/fa';

const GamesManagement = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGame, setEditingGame] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: '',
    featured: false,
    status: 'active'
  });

  // Load games
  useEffect(() => {
    console.log('Setting up games listener...');
    const gamesRef = collection(db, 'games');
    
    const unsubscribe = onSnapshot(
      gamesRef,
      (snapshot) => {
        console.log('Received games snapshot with', snapshot.docs.length, 'documents');
        const gamesList = [];
        snapshot.forEach((doc) => {
          gamesList.push({ id: doc.id, ...doc.data() });
        });
        console.log('Processed games:', gamesList);
        setGames(gamesList);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching games:', error);
        setLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up games listener');
      unsubscribe();
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

  const uploadImage = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `games/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = formData.image ? await uploadImage(formData.image) : formData.imagePreview;
      
      const gameData = {
        title: formData.title,
        description: formData.description,
        imageUrl,
        featured: formData.featured,
        status: formData.status,
        updatedAt: new Date().toISOString()
      };

      if (editingGame) {
        // Update existing game
        await updateDoc(doc(db, 'games', editingGame.id), gameData);
      } else {
        // Add new game
        await addDoc(collection(db, 'games'), {
          ...gameData,
          createdAt: new Date().toISOString()
        });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const editGame = (game) => {
    setEditingGame(game);
    setFormData({
      title: game.title,
      description: game.description,
      image: null,
      imagePreview: game.imageUrl || '',
      featured: game.featured || false,
      status: game.status || 'active'
    });
  };

  const deleteGame = async (id) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await deleteDoc(doc(db, 'games', id));
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: null,
      imagePreview: '',
      featured: false,
      status: 'active'
    });
    setEditingGame(null);
  };

  if (loading) return <div>Loading games...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Games Management</h2>
        <button
          onClick={resetForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Game
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Game Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Game
              </label>
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
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Game Image</label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                <FaImage className="inline-block mr-2" />
                {formData.image ? 'Change Image' : 'Upload Image'}
                <input type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
              </label>
              {formData.imagePreview && (
                <div className="ml-4 relative">
                  <img src={formData.imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded" />
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

          <div className="flex justify-end space-x-3 pt-4">
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
              {editingGame ? 'Update Game' : 'Add Game'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Games List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage all games in your system</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {games.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No games found. Add your first game to get started.
                  </td>
                </tr>
              ) : (
                games.map((game) => (
                  <tr key={game.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {game.imageUrl && (
                        <img src={game.imageUrl} alt={game.title} className="h-10 w-10 rounded-full object-cover" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{game.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-2">{game.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        game.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {game.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        game.featured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {game.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => editGame(game)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit className="inline-block" />
                      </button>
                      <button
                        onClick={() => deleteGame(game.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="inline-block" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GamesManagement;

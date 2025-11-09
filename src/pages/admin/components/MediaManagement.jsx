import React, { useState } from 'react';
import { storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const MediaManagement = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaList, setMediaList] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    const storageRef = ref(storage, `media/${file.name}`);
    
    try {
      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Add to media list
      setMediaList(prev => [
        {
          name: file.name,
          url: downloadURL,
          type: file.type.startsWith('image/') ? 'image' : 'file',
          size: file.size,
          uploadedAt: new Date().toISOString()
        },
        ...prev
      ]);
      
      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <div className="flex space-x-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="media-upload"
            accept="image/*,video/*"
          />
          <label
            htmlFor="media-upload"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 cursor-pointer"
          >
            Upload Media
          </label>
          {file && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Save'}
            </button>
          )}
        </div>
      </div>

      {file && (
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="mb-2">Selected: {file.name}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {mediaList.map((media, index) => (
          <div key={index} className="border rounded-md overflow-hidden bg-white">
            {media.type === 'image' ? (
              <img
                src={media.url}
                alt={media.name}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500">File: {media.name}</span>
              </div>
            )}
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 truncate">{media.name}</p>
              <p className="text-xs text-gray-500">
                {(media.size / 1024).toFixed(2)} KB
              </p>
              <a
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mt-1 inline-block"
              >
                View Full Size
              </a>
            </div>
          </div>
        ))}
      </div>

      {mediaList.length === 0 && !file && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No media files uploaded yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Click "Upload Media" to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaManagement;

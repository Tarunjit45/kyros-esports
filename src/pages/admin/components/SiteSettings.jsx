import React, { useState, useEffect } from 'react';
import { FaSave, FaImage, FaUpload, FaTrash, FaDiscord, FaTwitter, FaTwitch, FaYoutube } from 'react-icons/fa';

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    siteTitle: 'KYROS Esports',
    siteDescription: 'Premier Esports Organization',
    logo: '/kyros-logo.png',
    favicon: '/favicon.ico',
    primaryColor: '#7C3AED',
    secondaryColor: '#4F46E5',
    socialMedia: {
      discord: 'https://discord.gg/kyros',
      twitter: 'https://twitter.com/kyrosesports',
      twitch: 'https://twitch.tv/kyrosesports',
      youtube: 'https://youtube.com/kyrosesports',
    },
    seo: {
      metaTitle: 'KYROS Esports - Competitive Gaming',
      metaDescription: 'Join KYROS Esports in competitive gaming tournaments and events',
      metaKeywords: 'esports, gaming, tournaments, KYROS',
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setSettings(prev => ({
          ...prev,
          [type]: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Here you would typically send the settings to your backend
      console.log('Saving settings:', settings);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">General Settings</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Site Logo */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Site Logo
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={previewImage || settings.logo}
                  alt="Site Logo"
                  className="w-full h-full object-contain p-2"
                />
                <input
                  type="file"
                  id="logo-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                />
                <label
                  htmlFor="logo-upload"
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  title="Change logo"
                >
                  <FaUpload className="text-white w-5 h-5" />
                </label>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaTrash className="mr-1.5 h-3.5 w-3.5" />
                  Remove
                </button>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Recommended size: 200x50px
                </p>
              </div>
            </div>
          </div>

          {/* Site Title & Description */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Site Title
              </label>
              <input
                type="text"
                name="siteTitle"
                id="siteTitle"
                value={settings.siteTitle}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Site Description
              </label>
              <input
                type="text"
                name="siteDescription"
                id="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Color Scheme */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Primary Color
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                  <input
                    type="color"
                    name="primaryColor"
                    id="primaryColor"
                    value={settings.primaryColor}
                    onChange={handleChange}
                    className="h-10 block w-full rounded-none rounded-l-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                    {settings.primaryColor}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Secondary Color
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                  <input
                    type="color"
                    name="secondaryColor"
                    id="secondaryColor"
                    value={settings.secondaryColor}
                    onChange={handleChange}
                    className="h-10 block w-full rounded-none rounded-l-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                    {settings.secondaryColor}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Social Media</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(settings.socialMedia).map(([platform, url]) => (
                <div key={platform}>
                  <label htmlFor={`social-${platform}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {platform} URL
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300">
                          {platform === 'discord' && <FaDiscord className="h-4 w-4" />}
                          {platform === 'twitter' && <FaTwitter className="h-4 w-4" />}
                          {platform === 'twitch' && <FaTwitch className="h-4 w-4" />}
                          {platform === 'youtube' && <FaYoutube className="h-4 w-4" />}
                        </span>
                        <input
                          type="url"
                          name={`socialMedia.${platform}`}
                          id={`social-${platform}`}
                          value={url}
                          onChange={handleChange}
                          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                          placeholder={`https://${platform}.com/yourusername`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="seo.metaTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="seo.metaTitle"
                      id="seo.metaTitle"
                      value={settings.seo.metaTitle}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                      maxLength="60"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {settings.seo.metaTitle.length}/60 characters
                    </p>
                  </div>
                  <div>
                    <label htmlFor="seo.metaDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Meta Description
                    </label>
                    <textarea
                      name="seo.metaDescription"
                      id="seo.metaDescription"
                      rows="3"
                      value={settings.seo.metaDescription}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                      maxLength="160"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {settings.seo.metaDescription.length}/160 characters
                    </p>
                  </div>
                  <div>
                    <label htmlFor="seo.metaKeywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      name="seo.metaKeywords"
                      id="seo.metaKeywords"
                      value={settings.seo.metaKeywords}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                      placeholder="esports, gaming, tournaments, KYROS"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Separate keywords with commas
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="-ml-1 mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    };
    
    export default SiteSettings;

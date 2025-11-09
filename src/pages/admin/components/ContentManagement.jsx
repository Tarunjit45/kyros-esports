import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter, FiX, FiSave, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

// Sample content data
const sampleContent = [
  {
    id: 1,
    title: 'Welcome to KYROS Esports',
    type: 'page',
    slug: 'welcome',
    status: 'published',
    lastModified: '2023-11-08T12:30:00Z',
    author: 'Admin',
  },
  {
    id: 2,
    title: 'Upcoming Tournaments',
    type: 'post',
    slug: 'upcoming-tournaments',
    status: 'draft',
    lastModified: '2023-11-07T15:45:00Z',
    author: 'Admin',
  },
  {
    id: 3,
    title: 'Meet Our Teams',
    type: 'page',
    slug: 'teams',
    status: 'published',
    lastModified: '2023-11-06T09:15:00Z',
    author: 'Admin',
  },
];

const ContentManagement = () => {
  const [content, setContent] = useState(sampleContent);
  const [filteredContent, setFilteredContent] = useState(sampleContent);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const editorContent = watch('content', '');

  // Filter content based on search and filters
  useEffect(() => {
    let result = [...content];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters
    if (filters.type !== 'all') {
      result = result.filter(item => item.type === filters.type);
    }
    
    if (filters.status !== 'all') {
      result = result.filter(item => item.status === filters.status);
    }
    
    setFilteredContent(result);
    setCurrentPage(1);
  }, [searchTerm, filters, content]);

  // Handle content selection
  const handleSelectContent = (item) => {
    setSelectedContent(item);
    setIsEditing(false);
    reset({
      title: item.title,
      slug: item.slug,
      type: item.type,
      status: item.status,
      content: '<p>Sample content for ' + item.title + '</p>',
    });
  };

  // Handle form submission
  const onSubmit = (data) => {
    if (isEditing && selectedContent) {
      // Update existing content
      const updatedContent = content.map(item => 
        item.id === selectedContent.id ? { ...item, ...data, lastModified: new Date().toISOString() } : item
      );
      setContent(updatedContent);
      setSelectedContent({ ...selectedContent, ...data });
    } else {
      // Add new content
      const newContent = {
        id: Math.max(0, ...content.map(item => item.id)) + 1,
        ...data,
        lastModified: new Date().toISOString(),
        author: 'Admin',
      };
      setContent([...content, newContent]);
      setSelectedContent(newContent);
    }
    setIsEditing(false);
  };

  // Handle content deletion
  const handleDeleteContent = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      const updatedContent = content.filter(item => item.id !== id);
      setContent(updatedContent);
      if (selectedContent && selectedContent.id === id) {
        setSelectedContent(null);
      }
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage all your website content in one place
          </p>
        </div>
        <div className="flex space-x-3
        ">
          <button
            type="button"
            onClick={() => {
              setSelectedContent(null);
              setIsEditing(true);
              reset({
                title: '',
                slug: '',
                type: 'post',
                status: 'draft',
                content: '',
              });
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <FiPlus className="-ml-1 mr-2 h-4 w-4" />
            Add New
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <select
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">All Types</option>
                <option value="page">Page</option>
                <option value="post">Post</option>
                <option value="tournament">Tournament</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {(filters.type !== 'all' || filters.status !== 'all') && (
              <button
                type="button"
                onClick={() => setFilters({ type: 'all', status: 'all' })}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <FiX className="h-4 w-4 mr-1" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Content List */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {filteredContent.length} {filteredContent.length === 1 ? 'item' : 'items'}
              </h3>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <li key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <button
                      type="button"
                      onClick={() => handleSelectContent(item)}
                      className={`w-full text-left px-4 py-3 focus:outline-none ${
                        selectedContent?.id === item.id ? 'bg-purple-50 dark:bg-purple-900/30' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'published' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : item.status === 'draft' 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="truncate">{item.type}</span>
                        <span className="mx-1">•</span>
                        <span>{new Date(item.lastModified).toLocaleDateString()}</span>
                      </div>
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-6 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No content found</p>
                </li>
              )}
            </ul>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredContent.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredContent.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                      >
                        <span className="sr-only">Previous</span>
                        <FiChevronLeft className="h-5 w-5" />
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNum
                                ? 'z-10 bg-purple-50 border-purple-500 text-purple-600 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-200'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                      >
                        <span className="sr-only">Next</span>
                        <FiChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:w-2/3">
          {selectedContent || isEditing ? (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {isEditing ? (selectedContent ? 'Edit Content' : 'Add New Content') : 'Preview'}
                </h3>
                <div className="flex space-x-2
                ">
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:hover:bg-gray-500"
                    >
                      <FiEdit className="-ml-0.5 mr-1.5 h-4 w-4" />
                      Edit
                    </button>
                  )}
                  {isEditing && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedContent) {
                            setIsEditing(false);
                          } else {
                            setSelectedContent(null);
                          }
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        <FiSave className="-ml-0.5 mr-1.5 h-4 w-4" />
                        Save
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        {...register('title', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Slug <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                            /{watch('type') || 'post'}/
                          </span>
                          <input
                            type="text"
                            id="slug"
                            {...register('slug', { required: true })}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="example-page"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Type
                          </label>
                          <select
                            id="type"
                            {...register('type')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          >
                            <option value="page">Page</option>
                            <option value="post">Post</option>
                            <option value="tournament">Tournament</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Status
                          </label>
                          <select
                            id="status"
                            {...register('status')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Content <span className="text-red-500">*</span>
                      </label>
                      <div className="rounded-md border border-gray-300 dark:border-gray-600">
                        <Editor
                          apiKey="your-tinymce-api-key" // Replace with your TinyMCE API key
                          value={editorContent}
                          onEditorChange={(content) => setValue('content', content)}
                          init={{
                            height: 400,
                            menubar: true,
                            plugins: [
                              'advlist autolink lists link image charmap print preview anchor',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | bold italic backcolor | \
                                     alignleft aligncenter alignright alignjustify | \
                                     bullist numlist outdent indent | removeformat | help',
                            content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }',
                            skin: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide',
                            content_css: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default',
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {selectedContent && (
                        <button
                          type="button"
                          onClick={() => handleDeleteContent(selectedContent.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <FiTrash2 className="-ml-1 mr-2 h-4 w-4" />
                          Delete
                        </button>
                      )}
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        <FiSave className="-ml-1 mr-2 h-4 w-4" />
                        {selectedContent ? 'Update' : 'Publish'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="prose dark:prose-invert max-w-none">
                    <h1>{selectedContent.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: editorContent || '<p>No content available. Click Edit to add content.</p>' }} />
                    
                    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                            {selectedContent.type}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                          <dd className="mt-1">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              selectedContent.status === 'published' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : selectedContent.status === 'draft' 
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {selectedContent.status}
                            </span>
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Modified</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            {new Date(selectedContent.lastModified).toLocaleString()}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Author</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            {selectedContent.author}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">URL</dt>
                          <dd className="mt-1 text-sm text-purple-600 dark:text-purple-400">
                            <a href={`/${selectedContent.type}/${selectedContent.slug}`} target="_blank" rel="noopener noreferrer">
                              {window.location.origin}/{selectedContent.type}/{selectedContent.slug}
                            </a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden h-full flex items-center justify-center">
              <div className="text-center p-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No content selected</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Select an item from the list or create a new one.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedContent(null);
                      setIsEditing(true);
                      reset({
                        title: '',
                        slug: '',
                        type: 'post',
                        status: 'draft',
                        content: '',
                      });
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <FiPlus className="-ml-1 mr-2 h-4 w-4" />
                    New Content
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;

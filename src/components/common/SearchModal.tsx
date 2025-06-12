import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Leaf, MessageCircle } from 'lucide-react';
import { mockPlants, mockPosts } from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    plants: typeof mockPlants;
    posts: typeof mockPosts;
  }>({ plants: [], posts: [] });

  useEffect(() => {
    if (!query.trim()) {
      setResults({ plants: [], posts: [] });
      return;
    }

    const searchQuery = query.toLowerCase();
    
    const filteredPlants = mockPlants.filter(plant =>
      plant.name.toLowerCase().includes(searchQuery) ||
      plant.scientificName.toLowerCase().includes(searchQuery) ||
      plant.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    ).slice(0, 5);

    const filteredPosts = mockPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.body.toLowerCase().includes(searchQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    ).slice(0, 5);

    setResults({ plants: filteredPlants, posts: filteredPosts });
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center p-4 pt-16">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search plants, posts, or topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg focus:outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() && (results.plants.length > 0 || results.posts.length > 0) ? (
              <div className="p-6 space-y-6">
                {/* Plants */}
                {results.plants.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <Leaf className="w-4 h-4 mr-2 text-emerald-600" />
                      Plants ({results.plants.length})
                    </h3>
                    <div className="space-y-2">
                      {results.plants.map((plant) => (
                        <Link
                          key={plant.id}
                          to={`/plants/${plant.id}`}
                          onClick={onClose}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{plant.name}</p>
                            <p className="text-sm text-gray-600 italic">{plant.scientificName}</p>
                          </div>
                          <span className="text-xs text-gray-500 capitalize">{plant.category}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Posts */}
                {results.posts.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                      Posts ({results.posts.length})
                    </h3>
                    <div className="space-y-2">
                      {results.posts.map((post) => (
                        <Link
                          key={post.id}
                          to={`/community/post/${post.id}`}
                          onClick={onClose}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <img
                            src={post.avatar}
                            alt={post.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 line-clamp-1">{post.title}</p>
                            <p className="text-sm text-gray-600 line-clamp-2">{post.body}</p>
                            <p className="text-xs text-gray-500 mt-1">by {post.username}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : query.trim() ? (
              <div className="p-6 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No results found for "{query}"</p>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>Start typing to search plants and posts...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
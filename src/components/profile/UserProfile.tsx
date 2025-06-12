import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Plant, Post } from '../../types';
import { Calendar, MapPin, Award, Leaf, MessageCircle, Heart, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import PlantCard from '../plants/PlantCard';
import PostCard from '../community/PostCard';

interface UserProfileProps {
  user: User;
  posts: Post[];
  plants: Plant[];
}

export default function UserProfile({ user, posts, plants }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'posts', label: `Posts (${posts.length})` },
    { id: 'plants', label: `Plants (${plants.length})` }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'expert':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'expert':
        return '🌟';
      case 'moderator':
        return '🛡️';
      case 'admin':
        return '👑';
      default:
        return '👤';
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        <div className="px-8 pb-8">
          <div className="flex items-end space-x-6 -mt-16">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
            <div className="flex-1 pb-4">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(user.role)}`}>
                  <span className="mr-1">{getRoleIcon(user.role)}
                  </span>
                  {user.role}
                </span>
              </div>
              <p className="text-gray-600 mb-4 max-w-2xl">{user.bio}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Leaf className="w-4 h-4" />
                  <span>{user.plantsContributed} plants contributed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{user.postsCount} posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{plants.length}</p>
              <p className="text-sm text-gray-600">Plants Added</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              <p className="text-sm text-gray-600">Posts Created</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {posts.reduce((sum, post) => sum + post.likes, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Likes</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Recent Activity */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      to={`/community/post/${post.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{post.body.substring(0, 100)}...</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                            <span className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{post.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{post.comments.length}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Plants */}
              {plants.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Plants Added</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plants.slice(0, 3).map((plant) => (
                      <PlantCard key={plant.id} plant={plant} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                  <p className="text-sm">This user hasn't created any posts yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'plants' && (
            <div>
              {plants.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plants.map((plant) => (
                    <PlantCard key={plant.id} plant={plant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Leaf className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No plants added</h3>
                  <p className="text-sm">This user hasn't contributed any plants yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
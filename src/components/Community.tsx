import React, { useState, useMemo } from 'react';
import { Post } from '../types';
import PostCard from './PostCard';
import PostDetail from './PostDetail';
import { PlusCircle, Filter, TrendingUp, MessageCircle, Users, Award } from 'lucide-react';

interface CommunityProps {
  posts: Post[];
  searchQuery: string;
}

export default function Community({ posts, searchQuery }: CommunityProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      // Search query filter
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.plantName && post.plantName.toLowerCase().includes(searchQuery.toLowerCase()));

      // Type filter
      const matchesType = activeFilter === 'all' || post.type === activeFilter;

      return matchesSearch && matchesType;
    });

    // Sort posts
    switch (sortBy) {
      case 'popular':
        filtered = filtered.sort((a, b) => (b.likes + b.comments.length) - (a.likes + a.comments.length));
        break;
      case 'recent':
        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'mostCommented':
        filtered = filtered.sort((a, b) => b.comments.length - a.comments.length);
        break;
      default:
        break;
    }

    return filtered;
  }, [posts, searchQuery, activeFilter, sortBy]);

  const stats = useMemo(() => {
    return {
      totalPosts: posts.length,
      totalComments: posts.reduce((sum, post) => sum + post.comments.length, 0),
      activeUsers: new Set(posts.map(post => post.userId)).size,
      topContributor: posts.reduce((acc, post) => {
        acc[post.username] = (acc[post.username] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }, [posts]);

  const topContributor = Object.entries(stats.topContributor).sort(([,a], [,b]) => b - a)[0];

  const filters = [
    { id: 'all', label: 'All Posts', icon: MessageCircle },
    { id: 'question', label: 'Questions', icon: MessageCircle },
    { id: 'tip', label: 'Tips', icon: Award },
    { id: 'showcase', label: 'Showcase', icon: TrendingUp },
    { id: 'problem', label: 'Problems', icon: MessageCircle }
  ];

  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
              <p className="text-sm text-gray-600">Total Posts</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalComments}</p>
              <p className="text-sm text-gray-600">Comments</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{topContributor?.[0] || 'N/A'}</p>
              <p className="text-sm text-gray-600">Top Contributor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community</h2>
          <p className="text-gray-600 mt-1">
            {filteredAndSortedPosts.length} posts
            {searchQuery && (
              <span className="ml-1">
                matching "<span className="font-medium text-emerald-600">{searchQuery}</span>"
              </span>
            )}
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          <PlusCircle className="w-5 h-5" />
          <span>New Post</span>
        </button>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="mostCommented">Most Commented</option>
          </select>
        </div>
      </div>

      {/* Posts */}
      {filteredAndSortedPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? "Try adjusting your search terms to find what you're looking for."
              : "Be the first to start a conversation in the community!"
            }
          </p>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Create First Post
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredAndSortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPostClick={setSelectedPost}
            />
          ))}
        </div>
      )}
    </div>
  );
}
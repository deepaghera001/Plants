import React, { useState, useMemo } from 'react';
import { mockPosts } from '../data/mockData';
import PostCard from '../components/community/PostCard';
import CommunityFilters from '../components/community/CommunityFilters';
import CommunityStats from '../components/community/CommunityStats';
import { MessageCircle, Users, TrendingUp, Award, Sparkles, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = mockPosts.filter(post => {
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.plantName && post.plantName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = activeFilter === 'all' || post.type === activeFilter;

      return matchesSearch && matchesType;
    });

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
    }

    return filtered;
  }, [mockPosts, searchQuery, activeFilter, sortBy]);

  const postTypes = [
    { id: 'question', label: 'Questions', icon: '❓', color: 'blue', count: mockPosts.filter(p => p.type === 'question').length },
    { id: 'tip', label: 'Tips', icon: '💡', color: 'green', count: mockPosts.filter(p => p.type === 'tip').length },
    { id: 'showcase', label: 'Showcase', icon: '🌟', color: 'purple', count: mockPosts.filter(p => p.type === 'showcase').length },
    { id: 'problem', label: 'Problems', icon: '🚨', color: 'red', count: mockPosts.filter(p => p.type === 'problem').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Active Community of Plant Lovers
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Plant Care Community
            </h1>
            <p className="text-xl lg:text-2xl text-emerald-100 mb-8 leading-relaxed">
              Connect with fellow plant enthusiasts, share your experiences, ask questions, 
              and learn from our community of experts and passionate gardeners.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/community/create"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Plus className="mr-2 w-5 h-5" />
                Create Post
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-200">
                <Users className="mr-2 w-5 h-5" />
                Join Community
              </button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: MessageCircle, value: mockPosts.length, label: 'Total Posts' },
                { icon: Users, value: '2.5K+', label: 'Members' },
                { icon: TrendingUp, value: '95%', label: 'Response Rate' },
                { icon: Award, value: '4.9', label: 'Community Rating' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-emerald-200 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Post Types Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Type</h2>
          <p className="text-gray-600">Find the content that interests you most</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {postTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveFilter(type.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                activeFilter === type.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              <div className="text-3xl mb-3">{type.icon}</div>
              <p className="font-semibold text-gray-900 mb-1">{type.label}</p>
              <p className="text-sm text-gray-500">{type.count} posts</p>
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <CommunityStats posts={mockPosts} />

        <CommunityFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredAndSortedPosts.length}
        />

        {filteredAndSortedPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No posts found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery 
                ? "Try adjusting your search terms to find what you're looking for."
                : "Be the first to start a conversation in the community!"
              }
            </p>
            <Link
              to="/community/create"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
            >
              <Plus className="mr-2 w-5 h-5" />
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredAndSortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
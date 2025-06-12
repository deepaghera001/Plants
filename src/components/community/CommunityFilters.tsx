import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, Award, TrendingUp, Plus } from 'lucide-react';

interface CommunityFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

export default function CommunityFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  totalResults
}: CommunityFiltersProps) {
  const filters = [
    { id: 'all', label: 'All Posts', icon: MessageCircle },
    { id: 'question', label: 'Questions', icon: MessageCircle },
    { id: 'tip', label: 'Tips', icon: Award },
    { id: 'showcase', label: 'Showcase', icon: TrendingUp },
    { id: 'problem', label: 'Problems', icon: MessageCircle }
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Search and Create Post */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts, users, or topics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          />
        </div>
        <Link
          to="/community/create"
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Post</span>
        </Link>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {totalResults} posts
        {searchQuery && (
          <span className="ml-1">
            matching "<span className="font-medium text-emerald-600">{searchQuery}</span>"
          </span>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
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
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="mostCommented">Most Commented</option>
          </select>
        </div>
      </div>
    </div>
  );
}
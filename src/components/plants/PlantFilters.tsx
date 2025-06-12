import React from 'react';
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react';

interface PlantFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    category: string;
    careLevel: string;
    sunlight: string;
    water: string;
  };
  onFiltersChange: (filters: any) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

export default function PlantFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  totalResults
}: PlantFiltersProps) {
  const [showFilters, setShowFilters] = React.useState(false);

  const categories = ['flower', 'vegetable', 'herb', 'tree', 'succulent', 'houseplant'];
  const careLevels = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="space-y-6 mb-8">
      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search plants by name, type, or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
              showFilters ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
            <option value="careLevel">Sort by Care Level</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {totalResults} plants
        {searchQuery && (
          <span className="ml-1">
            matching "<span className="font-medium text-emerald-600">{searchQuery}</span>"
          </span>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} className="capitalize">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Care Level</label>
              <select
                value={filters.careLevel}
                onChange={(e) => onFiltersChange({ ...filters, careLevel: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              >
                <option value="">All Levels</option>
                {careLevels.map(level => (
                  <option key={level} value={level} className="capitalize">
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sunlight</label>
              <select
                value={filters.sunlight}
                onChange={(e) => onFiltersChange({ ...filters, sunlight: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              >
                <option value="">All Sunlight</option>
                <option value="full-sun">Full Sun</option>
                <option value="partial-sun">Partial Sun</option>
                <option value="shade">Shade</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Water Needs</label>
              <select
                value={filters.water}
                onChange={(e) => onFiltersChange({ ...filters, water: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              >
                <option value="">All Water Needs</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => onFiltersChange({ category: '', careLevel: '', sunlight: '', water: '' })}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
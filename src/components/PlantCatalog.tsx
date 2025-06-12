import React, { useState, useMemo } from 'react';
import { Plant } from '../types';
import PlantCard from './PlantCard';
import PlantDetail from './PlantDetail';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';

interface PlantCatalogProps {
  plants: Plant[];
  searchQuery: string;
}

export default function PlantCatalog({ plants, searchQuery }: PlantCatalogProps) {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: '',
    careLevel: '',
    sunlight: '',
    water: ''
  });

  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      // Search query filter
      const matchesSearch = !searchQuery || 
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = !filters.category || plant.category === filters.category;

      // Care level filter
      const matchesCareLevel = !filters.careLevel || plant.careLevel === filters.careLevel;

      // Sunlight filter
      const matchesSunlight = !filters.sunlight || plant.sunlightRequirement === filters.sunlight;

      // Water filter
      const matchesWater = !filters.water || plant.waterNeeds === filters.water;

      return matchesSearch && matchesCategory && matchesCareLevel && matchesSunlight && matchesWater;
    });
  }, [plants, searchQuery, filters]);

  const categories = [...new Set(plants.map(plant => plant.category))];
  const careLevels = [...new Set(plants.map(plant => plant.careLevel))];
  const sunlightOptions = ['full-sun', 'partial-sun', 'shade'];
  const waterOptions = ['low', 'moderate', 'high'];

  if (selectedPlant) {
    return (
      <PlantDetail
        plant={selectedPlant}
        onBack={() => setSelectedPlant(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Plant Catalog</h2>
          <p className="text-gray-600 mt-1">
            {filteredPlants.length} of {plants.length} plants
            {searchQuery && (
              <span className="ml-1">
                matching "<span className="font-medium text-emerald-600">{searchQuery}</span>"
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
              showFilters ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
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
                onChange={(e) => setFilters(prev => ({ ...prev, careLevel: e.target.value }))}
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
                onChange={(e) => setFilters(prev => ({ ...prev, sunlight: e.target.value }))}
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
                onChange={(e) => setFilters(prev => ({ ...prev, water: e.target.value }))}
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
              onClick={() => setFilters({ category: '', careLevel: '', sunlight: '', water: '' })}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {filteredPlants.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setFilters({ category: '', careLevel: '', sunlight: '', water: '' });
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onClick={() => setSelectedPlant(plant)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
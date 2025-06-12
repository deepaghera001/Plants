import React, { useState, useMemo } from 'react';
import { mockPlants } from '../data/mockData';
import PlantCard from '../components/plants/PlantCard';
import PlantFilters from '../components/plants/PlantFilters';
import { Leaf, TrendingUp, Award, Filter } from 'lucide-react';

export default function PlantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    careLevel: '',
    sunlight: '',
    water: ''
  });
  const [sortBy, setSortBy] = useState('name');

  const filteredPlants = useMemo(() => {
    let filtered = mockPlants.filter(plant => {
      const matchesSearch = !searchQuery || 
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = !filters.category || plant.category === filters.category;
      const matchesCareLevel = !filters.careLevel || plant.careLevel === filters.careLevel;
      const matchesSunlight = !filters.sunlight || plant.sunlightRequirement === filters.sunlight;
      const matchesWater = !filters.water || plant.waterNeeds === filters.water;

      return matchesSearch && matchesCategory && matchesCareLevel && matchesSunlight && matchesWater;
    });

    // Sort plants
    switch (sortBy) {
      case 'name':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        filtered = filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'careLevel':
        const careLevelOrder = { beginner: 1, intermediate: 2, advanced: 3 };
        filtered = filtered.sort((a, b) => careLevelOrder[a.careLevel] - careLevelOrder[b.careLevel]);
        break;
      case 'recent':
        filtered = filtered.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
        break;
    }

    return filtered;
  }, [mockPlants, searchQuery, filters, sortBy]);

  const categories = [...new Set(mockPlants.map(plant => plant.category))];
  const categoryStats = categories.map(category => ({
    name: category,
    count: mockPlants.filter(plant => plant.category === category).length,
    icon: category === 'houseplant' ? '🏠' : category === 'herb' ? '🌿' : category === 'flower' ? '🌸' : category === 'vegetable' ? '🥕' : category === 'succulent' ? '🌵' : '🌳'
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Discover Amazing Plants
            </h1>
            <p className="text-xl lg:text-2xl text-emerald-100 mb-8 leading-relaxed">
              Explore our comprehensive catalog of {mockPlants.length} plant species with detailed care guides, 
              growing tips, and community insights.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { icon: Leaf, value: mockPlants.length, label: 'Plant Species' },
                { icon: TrendingUp, value: '95%', label: 'Success Rate' },
                { icon: Award, value: '4.9', label: 'Expert Rating' },
                { icon: Filter, value: '12+', label: 'Categories' }
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

      {/* Categories Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-gray-600">Find plants that match your space and experience level</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categoryStats.map((category) => (
            <button
              key={category.name}
              onClick={() => setFilters(prev => ({ ...prev, category: category.name }))}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                filters.category === category.name
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <p className="font-semibold text-gray-900 capitalize text-sm">{category.name}</p>
              <p className="text-xs text-gray-500">{category.count} plants</p>
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <PlantFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredPlants.length}
        />

        {filteredPlants.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No plants found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({ category: '', careLevel: '', sunlight: '', water: '' });
              }}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
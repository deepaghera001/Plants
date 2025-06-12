import React from 'react';
import { Link } from 'react-router-dom';
import { Plant } from '../../types';
import { Clock, Sun, Droplets, Leaf, Star, Heart, Bookmark } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  const getCareIcon = (requirement: string) => {
    switch (requirement) {
      case 'full-sun':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'partial-sun':
        return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'shade':
        return <Sun className="w-4 h-4 text-gray-400" />;
      default:
        return <Sun className="w-4 h-4 text-gray-400" />;
    }
  };

  const getWaterIcon = (needs: string) => {
    const colors = {
      low: 'text-blue-300',
      moderate: 'text-blue-500',
      high: 'text-blue-700'
    };
    return <Droplets className={`w-4 h-4 ${colors[needs as keyof typeof colors]}`} />;
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link to={`/plants/${plant.id}`}>
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        
        {/* Overlay Badges */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm bg-white/90 ${getDifficultyColor(plant.careLevel)}`}>
            {plant.careLevel}
          </span>
        </div>
        
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-semibold text-gray-700">4.8</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
            <Bookmark className="w-4 h-4 text-gray-600 hover:text-emerald-500 transition-colors" />
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link to={`/plants/${plant.id}`} className="block mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-1">
            {plant.name}
          </h3>
          <p className="text-sm text-gray-500 italic mb-3">{plant.scientificName}</p>
        </Link>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">{plant.description}</p>

        {/* Care Requirements */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
            {getCareIcon(plant.sunlightRequirement)}
            <span className="text-xs text-gray-600 mt-1 font-medium">Light</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
            {getWaterIcon(plant.waterNeeds)}
            <span className="text-xs text-gray-600 mt-1 font-medium">Water</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-gray-600 mt-1 font-medium">
              {plant.growthTime.min}-{plant.growthTime.max} {plant.growthTime.unit}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {plant.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
          {plant.tags.length > 3 && (
            <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-full font-medium">
              +{plant.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Leaf className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-gray-500 capitalize font-medium">{plant.category}</span>
          </div>
          <Link
            to={`/plants/${plant.id}`}
            className="group/link flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors"
          >
            <span>Learn More</span>
            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Plant } from '../types';
import { Clock, Sun, Droplets, Leaf, Star } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
}

export default function PlantCard({ plant, onClick }: PlantCardProps) {
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
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plant.careLevel)}`}>
            {plant.careLevel}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 bg-white bg-opacity-90 rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium text-gray-700">4.8</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {plant.name}
          </h3>
          <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{plant.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {getCareIcon(plant.sunlightRequirement)}
              <span className="text-xs text-gray-600">Light</span>
            </div>
            <div className="flex items-center space-x-1">
              {getWaterIcon(plant.waterNeeds)}
              <span className="text-xs text-gray-600">Water</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-gray-600">
                {plant.growthTime.min}-{plant.growthTime.max} {plant.growthTime.unit}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {plant.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {plant.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
              +{plant.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Leaf className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-gray-500 capitalize">{plant.category}</span>
          </div>
          <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
}
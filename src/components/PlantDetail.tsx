import React, { useState } from 'react';
import { Plant, CareGuide } from '../types';
import { ArrowLeft, Sun, Droplets, Thermometer, Clock, Leaf, MapPin, Calendar, Star, Heart, Share2, MessageCircle } from 'lucide-react';
import { mockCareGuides, mockPosts } from '../data/mockData';

interface PlantDetailProps {
  plant: Plant;
  onBack: () => void;
}

export default function PlantDetail({ plant, onBack }: PlantDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);

  const careGuides = mockCareGuides.filter(guide => guide.plantId === plant.id);
  const relatedPosts = mockPosts.filter(post => post.plantId === plant.id);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'care', label: 'Care Guide' },
    { id: 'community', label: 'Community' }
  ];

  const getCareIcon = (requirement: string) => {
    switch (requirement) {
      case 'full-sun':
        return { icon: <Sun className="w-5 h-5 text-yellow-500" />, label: 'Full Sun (6+ hours)' };
      case 'partial-sun':
        return { icon: <Sun className="w-5 h-5 text-yellow-400" />, label: 'Partial Sun (4-6 hours)' };
      case 'shade':
        return { icon: <Sun className="w-5 h-5 text-gray-400" />, label: 'Shade (2-4 hours)' };
      default:
        return { icon: <Sun className="w-5 h-5 text-gray-400" />, label: 'Variable' };
    }
  };

  const getWaterIcon = (needs: string) => {
    const configs = {
      low: { icon: <Droplets className="w-5 h-5 text-blue-300" />, label: 'Low Water', desc: 'Water when soil is dry' },
      moderate: { icon: <Droplets className="w-5 h-5 text-blue-500" />, label: 'Moderate Water', desc: 'Water when top inch is dry' },
      high: { icon: <Droplets className="w-5 h-5 text-blue-700" />, label: 'High Water', desc: 'Keep soil consistently moist' }
    };
    return configs[needs as keyof typeof configs];
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
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Plants</span>
        </button>
      </div>

      {/* Plant Hero Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{plant.name}</h1>
                <p className="text-lg text-gray-600 italic mb-3">{plant.scientificName}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(plant.careLevel)}`}>
                    {plant.careLevel} level
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.8 (124 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{plant.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {getCareIcon(plant.sunlightRequirement).icon}
                  <div>
                    <p className="font-medium text-gray-900">Sunlight</p>
                    <p className="text-sm text-gray-600">{getCareIcon(plant.sunlightRequirement).label}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getWaterIcon(plant.waterNeeds).icon}
                  <div>
                    <p className="font-medium text-gray-900">Water</p>
                    <p className="text-sm text-gray-600">{getWaterIcon(plant.waterNeeds).label}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="font-medium text-gray-900">Growth Time</p>
                    <p className="text-sm text-gray-600">
                      {plant.growthTime.min}-{plant.growthTime.max} {plant.growthTime.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Thermometer className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Temperature</p>
                    <p className="text-sm text-gray-600">
                      {plant.temperatureRange.min}°F - {plant.temperatureRange.max}°F
                    </p>
                  </div>
                </div>
              </div>
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
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Plant Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium capitalize">{plant.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Soil Type</span>
                      <span className="font-medium">{plant.soilType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Season</span>
                      <span className="font-medium capitalize">{plant.season.join(', ')}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Water Needs</span>
                      <span className="font-medium capitalize">{plant.waterNeeds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Light Requirements</span>
                      <span className="font-medium">{getCareIcon(plant.sunlightRequirement).label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Care Level</span>
                      <span className="font-medium capitalize">{plant.careLevel}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {plant.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Care Instructions</h3>
              
              {careGuides.length > 0 ? (
                <div className="space-y-6">
                  {careGuides.map((guide) => (
                    <div key={guide.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-medium text-gray-900">{guide.stage}</h4>
                        <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                          {guide.timeframe}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{guide.instruction}</p>
                      {guide.tips.length > 0 && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Tips:</h5>
                          <ul className="space-y-1">
                            {guide.tips.map((tip, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Leaf className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <h4 className="text-lg font-medium mb-2">No care guides yet</h4>
                  <p className="text-sm">Be the first to contribute a care guide for this plant!</p>
                  <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    Add Care Guide
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Community Posts</h3>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Ask Question
                </button>
              </div>

              {relatedPosts.length > 0 ? (
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:border-emerald-200 transition-colors">
                      <div className="flex items-start space-x-3">
                        <img
                          src={post.avatar}
                          alt={post.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{post.username}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">2 days ago</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              post.type === 'problem' ? 'bg-red-100 text-red-700' :
                              post.type === 'question' ? 'bg-blue-100 text-blue-700' :
                              post.type === 'showcase' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {post.type}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-2">{post.title}</h4>
                          <p className="text-gray-700 text-sm mb-3">{post.body}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-emerald-600 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-emerald-600 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments.length}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <h4 className="text-lg font-medium mb-2">No posts yet</h4>
                  <p className="text-sm">Be the first to ask a question or share your experience with this plant!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
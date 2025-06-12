import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';

export default function AddPlantForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    category: '',
    description: '',
    careLevel: '',
    sunlightRequirement: '',
    waterNeeds: '',
    soilType: '',
    temperatureMin: '',
    temperatureMax: '',
    growthTimeMin: '',
    growthTimeMax: '',
    growthTimeUnit: 'weeks',
    season: [] as string[],
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = ['flower', 'vegetable', 'herb', 'tree', 'succulent', 'houseplant'];
  const careLevels = ['beginner', 'intermediate', 'advanced'];
  const sunlightOptions = ['full-sun', 'partial-sun', 'shade'];
  const waterOptions = ['low', 'moderate', 'high'];
  const seasons = ['spring', 'summer', 'fall', 'winter'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSeasonChange = (season: string) => {
    setFormData(prev => ({
      ...prev,
      season: prev.season.includes(season)
        ? prev.season.filter(s => s !== season)
        : [...prev.season, season]
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to your backend
    console.log('Plant data:', formData);
    // Navigate back to plants page
    navigate('/plants');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-8">
      {/* Basic Information */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plant Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              placeholder="e.g., Monstera Deliciosa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Scientific Name</label>
            <input
              type="text"
              name="scientificName"
              value={formData.scientificName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              placeholder="e.g., Monstera deliciosa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category} className="capitalize">
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Care Level *</label>
            <select
              name="careLevel"
              value={formData.careLevel}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            >
              <option value="">Select care level</option>
              {careLevels.map(level => (
                <option key={level} value={level} className="capitalize">
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            placeholder="Describe the plant, its characteristics, and benefits..."
          />
        </div>
      </div>

      {/* Care Requirements */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Care Requirements</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sunlight *</label>
            <select
              name="sunlightRequirement"
              value={formData.sunlightRequirement}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            >
              <option value="">Select sunlight needs</option>
              <option value="full-sun">Full Sun</option>
              <option value="partial-sun">Partial Sun</option>
              <option value="shade">Shade</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Water Needs *</label>
            <select
              name="waterNeeds"
              value={formData.waterNeeds}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            >
              <option value="">Select water needs</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
            <input
              type="text"
              name="soilType"
              value={formData.soilType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              placeholder="e.g., Well-draining potting mix"
            />
          </div>
        </div>
      </div>

      {/* Growth Information */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Growth Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Range (°F)</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="temperatureMin"
                value={formData.temperatureMin}
                onChange={handleInputChange}
                placeholder="Min"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              />
              <span className="self-center text-gray-500">to</span>
              <input
                type="number"
                name="temperatureMax"
                value={formData.temperatureMax}
                onChange={handleInputChange}
                placeholder="Max"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Growth Time</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="growthTimeMin"
                value={formData.growthTimeMin}
                onChange={handleInputChange}
                placeholder="Min"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              />
              <span className="self-center text-gray-500">to</span>
              <input
                type="number"
                name="growthTimeMax"
                value={formData.growthTimeMax}
                onChange={handleInputChange}
                placeholder="Max"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              />
              <select
                name="growthTimeUnit"
                value={formData.growthTimeUnit}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Growing Seasons</h2>
        <div className="flex flex-wrap gap-3">
          {seasons.map(season => (
            <label key={season} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.season.includes(season)}
                onChange={() => handleSeasonChange(season)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="capitalize text-gray-700">{season}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-emerald-500 hover:text-emerald-700"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add a tag..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Plant Image</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {imagePreview ? (
            <div className="space-y-4">
              <img
                src={imagePreview}
                alt="Plant preview"
                className="mx-auto h-48 w-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="text-red-600 hover:text-red-700"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <label className="cursor-pointer">
                  <span className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Upload an image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => navigate('/plants')}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Add Plant
        </button>
      </div>
    </form>
  );
}
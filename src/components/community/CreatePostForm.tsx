import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, Leaf } from 'lucide-react';
import { mockPlants } from '../../data/mockData';

export default function CreatePostForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    type: '',
    plantId: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const postTypes = [
    { value: 'question', label: 'Question', icon: '❓', description: 'Ask for help or advice' },
    { value: 'tip', label: 'Tip', icon: '💡', description: 'Share helpful advice' },
    { value: 'showcase', label: 'Showcase', icon: '🌟', description: 'Show off your plants' },
    { value: 'problem', label: 'Problem', icon: '🚨', description: 'Report plant issues' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Post data:', { ...formData, images });
    navigate('/community');
  };

  const selectedPlant = mockPlants.find(plant => plant.id === formData.plantId);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-8">
      {/* Post Type */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What type of post is this?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {postTypes.map((type) => (
            <label
              key={type.value}
              className={`cursor-pointer border-2 rounded-lg p-4 transition-colors ${
                formData.type === type.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="type"
                value={type.value}
                checked={formData.type === type.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{type.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{type.label}</p>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Plant Selection */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Plant (Optional)</h2>
        <div className="space-y-4">
          <select
            name="plantId"
            value={formData.plantId}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            <option value="">Select a plant (optional)</option>
            {mockPlants.map(plant => (
              <option key={plant.id} value={plant.id}>
                {plant.name} ({plant.scientificName})
              </option>
            ))}
          </select>
          {selectedPlant && (
            <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
              <img
                src={selectedPlant.image}
                alt={selectedPlant.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{selectedPlant.name}</p>
                <p className="text-sm text-gray-600 italic">{selectedPlant.scientificName}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Title and Content */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            placeholder="What's your post about?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            required
            rows={8}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            placeholder="Share your thoughts, questions, or experiences..."
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Images (Optional)</h2>
        <div className="space-y-4">
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <label className="cursor-pointer">
              <span className="text-emerald-600 hover:text-emerald-700 font-medium">
                Upload images
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <p className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB each</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full"
              >
                #{tag}
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
      </div>

      {/* Submit */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => navigate('/community')}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!formData.title || !formData.body || !formData.type}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
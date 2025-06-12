import React from 'react';
import AddPlantForm from '../components/plants/AddPlantForm';

export default function AddPlantPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Plant</h1>
        <p className="text-gray-600">
          Share your plant knowledge with the community by adding a new species
        </p>
      </div>
      
      <AddPlantForm />
    </div>
  );
}
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockPlants } from '../data/mockData';
import PlantDetail from '../components/plants/PlantDetail';

export default function PlantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const plant = mockPlants.find(p => p.id === id);

  if (!plant) {
    return <Navigate to="/plants" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PlantDetail plant={plant} />
    </div>
  );
}
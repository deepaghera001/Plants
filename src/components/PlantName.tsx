import React from 'react';

interface PlantNameProps {
  name: string;
  required?: boolean;
}

const PlantName: React.FC<PlantNameProps> = ({ name, required = false }) => (
  <div className="flex items-center space-x-1">
    <span className="block text-sm font-medium text-gray-700 mb-2">{name}</span>
    {required && <span className="text-red-500">*</span>}
  </div>
);

export default PlantName;

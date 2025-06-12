import React from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers, mockPlants, mockPosts } from '../data/mockData';
import UserProfile from '../components/profile/UserProfile';

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User not found</h1>
          <p className="text-gray-600">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const userPosts = mockPosts.filter(post => post.userId === userId);
  const userPlants = mockPlants.filter(plant => plant.addedBy === userId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserProfile 
        user={user} 
        posts={userPosts} 
        plants={userPlants} 
      />
    </div>
  );
}
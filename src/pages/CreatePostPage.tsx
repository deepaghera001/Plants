import React from 'react';
import CreatePostForm from '../components/community/CreatePostForm';

export default function CreatePostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600">
          Share your experience, ask questions, or provide tips to the community
        </p>
      </div>
      
      <CreatePostForm />
    </div>
  );
}
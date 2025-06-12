import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockPosts } from '../data/mockData';
import PostDetail from '../components/community/PostDetail';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const post = mockPosts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/community" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PostDetail post={post} />
    </div>
  );
}
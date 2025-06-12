import React, { useMemo } from 'react';
import { Post } from '../../types';
import { MessageCircle, Users, Award, TrendingUp } from 'lucide-react';

interface CommunityStatsProps {
  posts: Post[];
}

export default function CommunityStats({ posts }: CommunityStatsProps) {
  const stats = useMemo(() => {
    return {
      totalPosts: posts.length,
      totalComments: posts.reduce((sum, post) => sum + post.comments.length, 0),
      activeUsers: new Set(posts.map(post => post.userId)).size,
      topContributor: posts.reduce((acc, post) => {
        acc[post.username] = (acc[post.username] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }, [posts]);

  const topContributor = Object.entries(stats.topContributor).sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
            <p className="text-sm text-gray-600">Total Posts</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalComments}</p>
            <p className="text-sm text-gray-600">Comments</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
            <p className="text-sm text-gray-600">Active Users</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{topContributor?.[0] || 'N/A'}</p>
            <p className="text-sm text-gray-600">Top Contributor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
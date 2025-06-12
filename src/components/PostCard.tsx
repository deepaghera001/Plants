import React from 'react';
import { Post } from '../types';
import { Heart, MessageCircle, Share2, Leaf } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onPostClick: (post: Post) => void;
}

export default function PostCard({ post, onPostClick }: PostCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'tip':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'showcase':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'problem':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question':
        return '❓';
      case 'tip':
        return '💡';
      case 'showcase':
        return '🌟';
      case 'problem':
        return '🚨';
      default:
        return '💬';
    }
  };

  return (
    <div
      onClick={() => onPostClick(post)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-emerald-200"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.avatar}
              alt={post.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{post.username}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
              {post.plantName && (
                <div className="flex items-center space-x-1 mt-1">
                  <Leaf className="w-3 h-3 text-emerald-500" />
                  <span className="text-xs text-emerald-600">{post.plantName}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(post.type)}`}>
              <span className="mr-1">{getTypeIcon(post.type)}</span>
              {post.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-700 text-sm line-clamp-3">{post.body}</p>
        </div>

        {/* Images */}
        {post.images.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
              {post.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  {index === 3 && post.images.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-medium">+{post.images.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{post.comments.length}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
          <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
            View Discussion →
          </button>
        </div>
      </div>
    </div>
  );
}
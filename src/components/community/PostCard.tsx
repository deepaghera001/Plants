import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types';
import { Heart, MessageCircle, Share2, Leaf, MoreHorizontal, Bookmark, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
    <article className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 overflow-hidden transform hover:-translate-y-1">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link to={`/profile/${post.userId}`} className="relative">
              <img
                src={post.avatar}
                alt={post.username}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 hover:ring-emerald-200 transition-all"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <Link
                  to={`/profile/${post.userId}`}
                  className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
                >
                  {post.username}
                </Link>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500 font-medium">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
              {post.plantName && (
                <div className="flex items-center space-x-1 mt-1">
                  <Leaf className="w-3 h-3 text-emerald-500" />
                  <Link
                    to={`/plants/${post.plantId}`}
                    className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                  >
                    {post.plantName}
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(post.type)}`}>
              <span className="mr-1">{getTypeIcon(post.type)}</span>
              {post.type}
            </span>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <Link to={`/community/post/${post.id}`} className="block mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight">
            {post.title}
          </h3>
          <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">{post.body}</p>
        </Link>

        {/* Images */}
        {post.images.length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3 rounded-xl overflow-hidden">
              {post.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative group/image">
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {index === 3 && post.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-semibold text-lg">+{post.images.length - 4}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-full font-medium">
                  +{post.tags.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes + (isLiked ? 1 : 0)}</span>
            </button>
            
            <Link
              to={`/community/post/${post.id}`}
              className="flex items-center space-x-2 text-gray-500 hover:text-emerald-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments.length}</span>
            </Link>
            
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked ? 'text-emerald-500 bg-emerald-50' : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <Link
              to={`/community/post/${post.id}`}
              className="group/link flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Read More</span>
              <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
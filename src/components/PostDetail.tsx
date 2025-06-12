import React, { useState } from 'react';
import { Post, Comment } from '../types';
import { ArrowLeft, Heart, MessageCircle, Share2, Send, Leaf, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export default function PostDetail({ post, onBack }: PostDetailProps) {
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

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

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Here you would typically submit the comment to your backend
      console.log('Submitting comment:', newComment);
      setNewComment('');
    }
  };

  const toggleCommentLike = (commentId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Community</span>
        </button>
      </div>

      {/* Post */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6">
        <div className="p-8">
          {/* Post Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={post.avatar}
                alt={post.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{post.username}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </span>
                </div>
                {post.plantName && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Leaf className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-emerald-600 font-medium">{post.plantName}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(post.type)}`}>
                <span className="mr-1">{getTypeIcon(post.type)}</span>
                {post.type}
              </span>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{post.body}</p>
            </div>
          </div>

          {/* Post Images */}
          {post.images.length > 0 && (
            <div className="mb-6">
              <div className="grid gap-4">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full rounded-lg object-cover max-h-96"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full hover:bg-emerald-100 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-2 transition-colors ${
                  isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{post.likes + (isLiked ? 1 : 0)}</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-500">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{post.comments.length}</span>
              </div>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Comments ({post.comments.length})
          </h2>

          {/* Add Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-8">
            <div className="flex space-x-4">
              <img
                src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                alt="Your avatar"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a thoughtful comment..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 resize-none"
                />
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <img
                  src={comment.avatar}
                  alt={comment.username}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{comment.username}</span>
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.body}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => toggleCommentLike(comment.id)}
                      className={`flex items-center space-x-1 text-sm transition-colors ${
                        likedComments.has(comment.id)
                          ? 'text-red-500'
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedComments.has(comment.id) ? 'fill-current' : ''}`} />
                      <span>{comment.likes + (likedComments.has(comment.id) ? 1 : 0)}</span>
                    </button>
                    <button className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {post.comments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No comments yet</h3>
              <p className="text-sm">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
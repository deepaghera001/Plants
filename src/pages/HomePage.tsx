import { ArrowRight, BookOpen, Leaf, Star, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostCard from '../components/community/PostCard';
import PlantCard from '../components/plants/PlantCard';
import { mockPlants, mockPosts } from '../data/mockData';

export default function HomePage() {
  const featuredPlants = mockPlants.slice(0, 3);
  const recentPosts = mockPosts.slice(0, 2);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Grow Your
                <span className="text-emerald-600 block">Plant Knowledge</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join our thriving community of plant enthusiasts. Discover care guides, 
                share experiences, and grow together with fellow gardeners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/plants"
                  className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Explore Plants
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/community"
                  className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Join Community
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beautiful plants"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">2,500+</p>
                    <p className="text-sm text-gray-600">Active Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">500+</p>
            <p className="text-gray-600">Plant Species</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">1,200+</p>
            <p className="text-gray-600">Care Guides</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">2,500+</p>
            <p className="text-gray-600">Community Members</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">4.9</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Plants</h2>
            <p className="text-gray-600">Discover popular plants perfect for beginners</p>
          </div>
          <Link
            to="/plants"
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      {/* Community Highlights */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Highlights</h2>
              <p className="text-gray-600">Recent discussions and tips from our community</p>
            </div>
            <Link
              to="/community"
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <span>Join Discussion</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Plant Journey?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of plant lovers sharing knowledge, asking questions, and growing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/add-plant"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-emerald-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Leaf className="mr-2 w-5 h-5" />
                Add Your First Plant
              </Link>
              <Link
                to="/community/create"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <TrendingUp className="mr-2 w-5 h-5" />
                Share Your Experience
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
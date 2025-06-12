import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">PlantCare Community</h3>
                <p className="text-sm text-gray-500">Growing together, one plant at a time</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Join our community of plant enthusiasts to share knowledge, get expert advice, 
              and discover the joy of growing plants together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/plants" className="text-gray-600 hover:text-emerald-600 transition-colors">Browse Plants</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-emerald-600 transition-colors">Community</Link></li>
              <li><Link to="/add-plant" className="text-gray-600 hover:text-emerald-600 transition-colors">Add Plant</Link></li>
              <li><Link to="/community/create" className="text-gray-600 hover:text-emerald-600 transition-colors">Create Post</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Guidelines</a></li>
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 PlantCare Community. Made with 🌱 for plant lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
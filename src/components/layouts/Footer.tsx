import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Value Proposition Grid */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full bg-sage-dark/10 flex items-center justify-center text-sage-light">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Free & Fast Delivery</h4>
                <p className="text-sm text-gray-400">Free shipping on all orders over ₹1500</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full bg-sage-dark/10 flex items-center justify-center text-sage-light">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Easy Returns</h4>
                <p className="text-sm text-gray-400">Hassle-free 30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full bg-sage-dark/10 flex items-center justify-center text-sage-light">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">100% Secure Checkout</h4>
                <p className="text-sm text-gray-400">Encrypted payments & buyers protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg gradient-sage flex items-center justify-center text-white font-bold text-lg shadow-lg">
                T
              </span>
              <span className="font-extrabold text-xl tracking-tight text-white">
                TeeKart
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium quality, organic cotton, and eco-friendly t-shirts designed for ultimate comfort and modern style. Specially made for boys and girls.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-sage-dark flex items-center justify-center hover:text-white transition-colors duration-200">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-sage-dark flex items-center justify-center hover:text-white transition-colors duration-200">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-sage-dark flex items-center justify-center hover:text-white transition-colors duration-200">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links: Shop */}
          <div>
            <h5 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Shop Collections</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/products?category=boys" className="hover:text-white transition-colors">Boys T-Shirts</Link></li>
              <li><Link to="/products?category=girls" className="hover:text-white transition-colors">Girls T-Shirts</Link></li>
              <li><Link to="/products?featured=true" className="hover:text-white transition-colors">Featured Collection</Link></li>
            </ul>
          </div>

          {/* Links: Support */}
          <div>
            <h5 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Customer Support</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h5 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Store Information</h5>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <MapPin className="h-5 w-5 text-sage-light flex-shrink-0" />
                <span>102, Green Avenue, BKC, Mumbai - 400051</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-5 w-5 text-sage-light flex-shrink-0" />
                <span>+91 (22) 4920-1002</span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-5 w-5 text-sage-light flex-shrink-0" />
                <span>support@teekart.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} TeeKart. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { getVendors } from '../services/api';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

import { useNavigate } from '@tanstack/react-router';

export default function VendorListing() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  
  const categories = ["All", "Photography", "Venue", "Makeup", "Decoration", "Catering", "Planning"];

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await getVendors();
        setVendors(res.data || []);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === '' || category === 'All' ? true : v.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading italic text-white mb-4">Discover Elite Vendors</h1>
        <p className="font-body text-white/60 max-w-2xl">Find the perfect team of professionals to bring your dream wedding to life.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="flex-1 lux-glass-strong rounded-full px-6 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-white/50" />
          <input 
            type="text" 
            placeholder="Search by name or city..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/30 font-body text-sm"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-body font-medium transition-colors
                ${category === cat || (cat === 'All' && !category) 
                  ? 'bg-rose-400 text-white shadow-lg shadow-rose-500/20' 
                  : 'lux-glass text-white/70 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vendor Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-rose-400 animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredVendors.map((vendor) => (
            <motion.div 
              key={vendor.id}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5 }}
              onClick={() => navigate({ to: '/vendors/$id', params: { id: vendor.id } })}
              className="lux-glass rounded-2xl overflow-hidden group cursor-pointer flex flex-col"
            >
              <div className="h-48 md:h-64 overflow-hidden relative">
                <img 
                  src={vendor.image} 
                  alt={vendor.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                  <span className="text-white font-body text-xs font-semibold">{vendor.rating}</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-heading text-white">{vendor.name}</h3>
                  <span className="text-rose-300 font-body text-sm font-medium">{vendor.price_range}</span>
                </div>
                
                <div className="uppercase tracking-widest text-[10px] font-body text-white/40 mb-4">
                  {vendor.category}
                </div>
                
                <div className="flex items-center gap-2 text-white/60 font-body text-sm mt-auto pt-4 border-t border-white/10">
                  <MapPin className="w-4 h-4" />
                  {vendor.city}
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredVendors.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <p className="text-white/50 font-body">No vendors found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

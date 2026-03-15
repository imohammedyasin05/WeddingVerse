import React, { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar, Mail, CheckCircle2 } from 'lucide-react';
import { getVendorById } from '../services/api';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from '@tanstack/react-router';

export default function VendorDetails() {
  const { id } = useParams({ strict: false });
  const [vendor, setVendor] = useState(null);
  const [vendorLoading, setVendorLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Basic route protection
    if (!authLoading && !user) {
      navigate({ to: '/login' });
      return;
    }

    const fetchVendor = async () => {
      try {
        const res = await getVendorById(id);
        const fetchedVendor = res.data;
        
        // Ensure properties match UI expectations, provide fallbacks if missing
        if (fetchedVendor) {
          fetchedVendor.images = fetchedVendor.image_url ? [fetchedVendor.image_url] : ["https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80"];
          fetchedVendor.services = fetchedVendor.services || [];
          fetchedVendor.reviews = fetchedVendor.reviews || [];
        }
        
        setVendor(fetchedVendor);
      } catch (error) {
        console.error("Failed to fetch vendor details:", error);
      } finally {
        setVendorLoading(false);
      }
    };
    
    if (id && user) {
       fetchVendor();
    }
  }, [id, user, authLoading, navigate]);

  if (authLoading || vendorLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-rose-400 animate-spin"></div>
      </div>
    );
  }

  if (!vendor) return <div className="pt-32 px-6 text-white text-center">Vendor not found</div>;

  return (
    <div className="pt-24 pb-24 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto min-h-screen">
      {/* Header & Main Image */}
      <div className="mb-12">
        <div className="uppercase tracking-[0.2em] text-xs font-body font-semibold text-rose-300 mb-4">{vendor.category}</div>
        <h1 className="text-4xl md:text-6xl font-heading italic text-white mb-6">{vendor.name}</h1>
        <div className="flex items-center gap-6 text-white/70 font-body text-sm">
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-rose-300" /> {vendor.city}</span>
          <span className="flex items-center gap-2"><Star className="w-4 h-4 text-gold fill-gold" /> {vendor.rating} (Verified Reviews)</span>
          <span className="font-semibold">{vendor.price_range}</span>
        </div>
      </div>

      <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-16">
        <img src={vendor.images[0]} alt={vendor.name} className="w-full h-full object-cover" />
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-16">
          {/* About */}
          <section>
            <h3 className="text-2xl font-heading text-white mb-6">About the Vendor</h3>
            <p className="font-body text-white/70 leading-relaxed whitespace-pre-line">{vendor.description}</p>
          </section>

          {/* Portfolio Grid */}
          <section>
            <h3 className="text-2xl font-heading text-white mb-6">Portfolio</h3>
            <div className="grid grid-cols-2 gap-4">
              {vendor.images.slice(1).map((img, i) => (
                <div key={i} className="h-48 md:h-64 rounded-xl overflow-hidden">
                  <img src={img} alt="Portfolio item" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </section>

          {/* Pricing & Services */}
          <section>
            <h3 className="text-2xl font-heading text-white mb-6">Services & Pricing</h3>
            <div className="space-y-4">
              {vendor.services.map((service, i) => (
                <div key={i} className="flex items-center justify-between p-6 lux-glass rounded-2xl">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-5 h-5 text-rose-300" />
                    <span className="font-body text-white">{service.name}</span>
                  </div>
                  <span className="font-body font-semibold text-white/90">{service.price}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <h3 className="text-2xl font-heading text-white mb-6">Client Reviews</h3>
            <div className="space-y-6">
              {vendor.reviews.map(review => (
                <div key={review.id} className="p-8 lux-glass rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300 font-bold font-heading">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <h5 className="text-white font-body font-medium">{review.user}</h5>
                        <span className="text-xs text-white/40">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-gold fill-gold' : 'text-white/20'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="font-body text-white/70 italic text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

          {/* Sidebar Inquiry Form */}
        <div>
          <div className="lux-glass-strong p-8 rounded-3xl sticky top-32">
            <h3 className="text-2xl font-heading italic text-white mb-2">Send an Inquiry</h3>
            <p className="text-sm font-body text-white/50 mb-8">Reach out to {vendor.name} to check availability and discuss your vision.</p>
            
            <InquiryForm vendorId={vendor.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InquiryForm({ vendorId }) {
  const [formData, setFormData] = useState({ message: '', event_date: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');
  
  const { sendInquiry } = require('../services/api');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    
    try {
      await sendInquiry({
        vendor_id: vendorId,
        message: formData.message,
        event_date: new Date(formData.event_date).toISOString()
      });
      setStatus('success');
      setFormData({ message: '', event_date: '' });
    } catch (error) {
       setStatus('error');
       setErrorMsg(error.response?.data?.message || 'Failed to send inquiry. Are you logged in?');
    }
  };
  
  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <h4 className="text-xl font-heading text-white mb-2">Inquiry Sent!</h4>
        <p className="text-sm text-white/60 font-body">The vendor will get back to you soon.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-rose-300 hover:text-white transition-colors"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg font-body">
          {errorMsg}
        </div>
      )}
      
      <div>
        <label className="block text-xs font-body text-white/60 uppercase tracking-wider mb-2">Event Date</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="date" 
            required
            value={formData.event_date}
            onChange={e => setFormData({...formData, event_date: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white font-body text-sm focus:border-rose-300/50 outline-none transition-colors [color-scheme:dark]" 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-body text-white/60 uppercase tracking-wider mb-2">Message</label>
        <textarea 
          required 
          rows="4" 
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm focus:border-rose-300/50 outline-none transition-colors resize-none" 
          placeholder={`Hi, we'd love to chat about booking you for our wedding...`}
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full bg-rose-400 hover:bg-rose-500 disabled:opacity-50 text-white font-body font-medium py-4 rounded-xl transition-colors shadow-lg shadow-rose-500/20 flex justify-center items-center gap-2"
      >
        {status === 'loading' ? (
          <div className="w-5 h-5 rounded-full border-t-2 border-r-2 border-white animate-spin"></div>
        ) : (
          <><Mail className="w-4 h-4" /> Send Request</>
        )}
      </button>
    </form>
  )
}

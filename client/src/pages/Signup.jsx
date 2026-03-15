import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await register(formData);
      navigate({ to: '/dashboard' });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md lux-glass-strong p-8 md:p-10 rounded-3xl relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
            <Heart className="w-8 h-8 text-rose-300" />
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-heading italic text-white mb-2">Create Account</h1>
          <p className="font-body text-white/50 text-sm">Join WeddingVerse to start planning</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-body text-white/60 uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white font-body text-sm focus:border-rose-300/50 outline-none transition-colors" 
                placeholder="Jane Doe" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-body text-white/60 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white font-body text-sm focus:border-rose-300/50 outline-none transition-colors" 
                placeholder="you@example.com" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-body text-white/60 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="password" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white font-body text-sm focus:border-rose-300/50 outline-none transition-colors" 
                placeholder="••••••••" 
                minLength="6"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-rose-400 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-body font-medium py-4 rounded-xl transition-all shadow-lg shadow-rose-500/20 flex justify-center items-center gap-2 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-t-2 border-r-2 border-white animate-spin"></div>
            ) : (
              <><UserPlus className="w-4 h-4" /> Sign Up</>
            )}
          </button>
        </form>

        <p className="text-center text-sm font-body text-white/50 mt-8">
          Already have an account?{' '}
          <button onClick={() => navigate({ to: '/login' })} className="text-rose-300 hover:text-rose-400 transition-colors font-medium">
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
}

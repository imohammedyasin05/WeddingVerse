import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { User, Heart, MessageSquare, Settings, LogOut, MapPin, Calendar, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserInquiries } from '../services/api';

export default function Dashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: '/login' });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && activeTab === 'inquiries') {
      const fetchInquiries = async () => {
        setLoading(true);
        try {
          const res = await getUserInquiries();
          setInquiries(res.data || []);
        } catch (error) {
          console.error("Failed to fetch inquiries", error);
        } finally {
          setLoading(false);
        }
      };
      fetchInquiries();
    } else {
      setLoading(false);
    }
  }, [user, activeTab]);

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  // Mock Data for saved vendors since there is no saved vendor backend entity
  const savedVendors = [
    { id: 1, name: "Luxe Capture", category: "Photography", city: "New York", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80" }
  ];

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'saved', label: 'Saved Vendors', icon: Heart },
    { id: 'inquiries', label: 'My Inquiries', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (authLoading || !user) {
     return <div className="min-h-screen pt-32 flex justify-center"><div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-rose-400 animate-spin"></div></div>;
  }

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="lux-glass-strong p-6 rounded-3xl sticky top-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300 font-bold font-heading text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-heading text-white">{user.name}</h3>
                <p className="text-xs font-body text-white/50">Member since {joinDate}</p>
              </div>
            </div>

            <nav className="space-y-2 mb-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-body text-sm
                    ${activeTab === tab.id ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/10">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-white/5 transition-colors font-body text-sm">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lux-glass p-6 md:p-10 rounded-3xl min-h-[500px]">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl font-heading italic text-white mb-6">My Profile</h2>
              <div className="grid gap-6 max-w-xl">
                <div className="lux-glass p-6 rounded-2xl">
                  <div className="mb-4">
                    <label className="text-xs text-white/50 uppercase tracking-widest block mb-1">Full Name</label>
                    <p className="font-body text-white text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-widest block mb-1">Email Address</label>
                    <p className="font-body text-white text-lg">{user.email}</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-medium transition-colors w-max">
                  Edit Profile
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl font-heading italic text-white mb-6">Saved Vendors</h2>
              {savedVendors.length === 0 ? (
                <p className="text-white/50 font-body">You haven't saved any vendors yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {savedVendors.map(vendor => (
                    <div key={vendor.id} className="lux-glass rounded-2xl overflow-hidden group cursor-pointer flex flex-col">
                      <div className="h-40 overflow-hidden relative">
                        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <button className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full text-rose-400 hover:text-white transition-colors">
                          <Heart className="w-4 h-4 fill-rose-400" />
                        </button>
                      </div>
                      <div className="p-5">
                        <h4 className="text-lg font-heading text-white mb-1">{vendor.name}</h4>
                        <span className="text-xs text-rose-300 font-body uppercase tracking-wider block mb-3">{vendor.category}</span>
                        <div className="flex items-center gap-1.5 text-white/60 text-xs font-body">
                          <MapPin className="w-3.5 h-3.5" /> {vendor.city}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'inquiries' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl font-heading italic text-white mb-6">My Inquiries</h2>
              {inquiries.length === 0 ? (
                <p className="text-white/50 font-body">You haven't sent any inquiries yet.</p>
              ) : (
                <div className="space-y-4">
                  {inquiries.map(inquiry => (
                    <div key={inquiry.id} className="lux-glass p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-heading text-white border-b border-white/10 pb-2 mb-2">To: {inquiry.vendor}</h4>
                          <div className="flex items-center gap-2 text-white/60 text-sm font-body">
                            <Calendar className="w-4 h-4 text-rose-300" /> Event Date: {inquiry.date}
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full font-medium">
                          {inquiry.status}
                        </span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <p className="text-white/70 font-body text-sm italic">"{inquiry.preview}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl font-heading italic text-white mb-6">Settings</h2>
              <p className="text-white/50 font-body">Account settings and preferences will appear here.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

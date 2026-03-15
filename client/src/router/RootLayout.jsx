import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
    
    ::selection { background: rgba(253, 164, 175, 0.4); color: white; }
    
    html { scroll-behavior: smooth; }
  `;

  return (
    <AuthProvider>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="font-body text-white selection:bg-rose-300/40 selection:text-white pb-0 bg-[#0B0B10] min-h-screen">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

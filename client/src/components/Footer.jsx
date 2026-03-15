import React from 'react';
import { Heart } from 'lucide-react';

const Footer = React.forwardRef((props, ref) => (
  <footer ref={ref} id="contact" className="border-t border-white/10 pt-24 pb-12 px-6 md:px-12 lg:px-24 scroll-mt-0">
    <div className="max-w-[1600px] mx-auto">
      <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-24">
        {/* Left */}
        <div>
          <Heart className="w-8 h-8 text-white mb-8" />
          <h2 className="text-3xl font-heading italic text-white mb-8">Your forever begins here.</h2>
          <div className="flex flex-col sm:flex-row border border-white/20 rounded-2xl sm:rounded-full p-1 max-w-sm gap-2 sm:gap-0">
            <input type="email" placeholder="Email address" className="bg-transparent border-none outline-none text-white px-4 py-3 sm:py-2 w-full font-body text-sm rounded-full" />
            <button className="bg-white text-[#0B0B10] px-6 py-3 sm:py-2 rounded-full font-medium text-sm hover:bg-white/90 transition-colors w-full sm:w-auto">Subscribe</button>
          </div>
        </div>

        {/* Middle */}
        <div>
          <h4 className="uppercase tracking-[0.2em] text-xs font-body font-semibold text-rose-300 mb-6">Explore</h4>
          <ul className="space-y-4">
            {['Vendors', 'Gallery', 'Stories', 'Destinations'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} className="font-body text-white/60 hover:text-white transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div>
          <h4 className="uppercase tracking-[0.2em] text-xs font-body font-semibold text-rose-300 mb-6">Company</h4>
          <ul className="space-y-4">
            {['About', 'Careers', 'Contact', 'Privacy'].map(link => (
              <li key={link}><a href="#" className="font-body text-white/60 hover:text-white transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4 md:gap-0">
        <p className="text-white/40 font-body text-sm text-center md:text-left">© 2026 WeddingVerse</p>
      </div>
    </div>
  </footer>
));

export default Footer;

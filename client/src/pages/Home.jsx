import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';

// --- Animations ---
const fadeUpVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const BlurText = ({ text, className = "" }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };
  const child = {
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  };

  return (
    <motion.div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center" }} variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index} className={className}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- Components ---
const Section = React.forwardRef(({ children, className = "", id }, ref) => (
  <motion.section
    id={id}
    ref={ref}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={fadeUpVariants}
    className={`py-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto scroll-mt-24 ${className}`}
  >
    {children}
  </motion.section>
));

const Hero = React.forwardRef(({ onExploreClick, onWatchClick }, ref) => (
  <section ref={ref} id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden scroll-mt-0">
    <div className="absolute inset-0 w-full h-full">
      <video autoPlay loop muted playsInline className="object-cover w-full h-full scale-105" src="/assets/background.mp4" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0B0B10]"></div>
    </div>
    <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="uppercase tracking-[0.25em] text-xs font-body font-semibold text-white/70 mb-6">
        Luxury Wedding Planning
      </motion.div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading italic text-white text-balance leading-[1.1] mb-8">
        <BlurText text="Craft Your Perfect Wedding Story" />
      </h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="text-lg md:text-xl font-body text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
        Discover elite vendors, breathtaking venues, and world-class planners for the most important day of your life.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="flex flex-col sm:flex-row items-center gap-6">
        <button onClick={onExploreClick} className="lux-glass-strong px-8 py-4 rounded-full text-white font-body font-medium hover:bg-white/10 transition-colors w-full sm:w-auto">
          Explore Vendors
        </button>
        <button onClick={onWatchClick} className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-body font-medium hover:bg-white/5 transition-colors w-full sm:w-auto">
          <Play className="w-4 h-4" /> Watch Story
        </button>
      </motion.div>
    </div>
  </section>
));

const LoveStory = () => (
  <Section className="py-32 relative text-center flex flex-col items-center justify-center -mt-24">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[400px] md:h-[400px] bg-rose-500/20 rounded-full blur-[120px] pointer-events-none"></div>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-balance leading-tight relative z-10 max-w-4xl mx-auto text-white">
      <BlurText text="Every wedding deserves a story worth remembering forever." />
    </h2>
  </Section>
);

const FeaturedServices = React.forwardRef((props, ref) => {
  const services = [
    { title: "Photography", icon: "📸", desc: "Cinematic memories" },
    { title: "Makeup", icon: "✨", desc: "Flawless bridal looks" },
    { title: "Decoration", icon: "🌸", desc: "Breathtaking setups" },
    { title: "Venue", icon: "🏰", desc: "Palatial destinations" },
    { title: "Catering", icon: "🥂", desc: "Gourmet experiences" },
    { title: "Planning", icon: "📋", desc: "End-to-end management" },
  ];
  return (
    <Section ref={ref} id="vendors">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="lux-glass h-[500px] md:h-[600px] group relative cursor-pointer">
          <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80" alt="Wedding Couple" className="w-full h-full object-cover rounded-inherit transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10">
            <div className="uppercase tracking-[0.25em] text-xs font-body font-semibold text-rose-300 mb-2">Featured</div>
            <h3 className="text-4xl font-heading italic text-white">Elite Photography</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 h-full">
          {services.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="lux-glass p-6 md:p-8 flex flex-col justify-center gap-4 cursor-pointer group">
              <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{s.icon}</span>
              <div>
                <h4 className="text-xl font-heading text-white">{s.title}</h4>
                <p className="text-sm font-body text-white/50 mt-1">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
});

const FeaturesGrid = () => {
  const features = ["Vendor discovery", "Smart budget planning", "Wedding inspiration gallery", "Vendor reviews", "Secure bookings", "Personal dashboard"];
  return (
    <Section>
      <div className="text-center mb-16">
        <div className="uppercase tracking-[0.25em] text-xs font-body font-semibold text-rose-300 mb-4">Platform Capabalities</div>
        <h2 className="text-4xl md:text-5xl font-heading italic text-white">Designed for Your Dream Wedding</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={i} whileHover={{ y: -4 }} className="lux-glass-strong p-8 text-center group">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/5 transition-colors">
              <span className="text-rose-300 font-heading italic text-xl">{i + 1}</span>
            </div>
            <h4 className="text-lg font-body font-medium text-white">{f}</h4>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const Timeline = () => {
  const steps = [
    { title: "Engagement Planning", desc: "Set the date, establish a vision, and determine your initial budget." },
    { title: "Venue & Vendors", desc: "Discover and secure your dream location and elite professional team." },
    { title: "Wedding Celebration", desc: "Experience the magic of your perfectly coordinated special day." },
    { title: "Happily Ever After", desc: "Receive your memories and begin your new chapter together." }
  ];
  return (
    <Section className="relative" id="timeline">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-heading italic text-white">The Weddingverse Journey</h2>
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-500/50 to-transparent hidden md:block"></div>
        {steps.map((step, i) => (
          <div key={i} className={`flex flex-col md:items-center justify-between w-full mb-16 relative ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:text-right text-left' : 'text-left'}`}>
              <motion.div whileHover={{ scale: 1.02 }} className="lux-glass p-8 inline-block w-full">
                <div className="uppercase tracking-[0.2em] text-[10px] font-body text-rose-300 mb-2">Phase 0{i+1}</div>
                <h4 className="text-2xl font-heading italic text-white mb-3">{step.title}</h4>
                <p className="text-sm font-body text-white/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            </div>
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.5)] border-4 border-[#0B0B10]"></div>
            <div className="hidden md:block w-[45%]"></div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Destinations = React.forwardRef((props, ref) => {
  const places = [
    { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80", span: "md:col-span-2 md:row-span-2" },
    { name: "Santorini", img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80", span: "md:col-span-1 md:row-span-1" },
    { name: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80", span: "md:col-span-1 md:row-span-1" },
    { name: "Lake Como", img: "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&q=80", span: "md:col-span-2 md:row-span-1" },
  ];
  return (
    <Section ref={ref} id="gallery">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-heading italic text-white">Magical Destinations</h2>
        <p className="font-body text-white/60 mt-4 max-w-xl">Curated global locations for the ultimate destination wedding experience.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[800px] md:h-[600px] lg:h-[800px]">
        {places.map((p, i) => (
          <motion.div key={i} whileHover={{ scale: 0.98 }} className={`lux-glass relative group overflow-hidden ${p.span} min-h-[200px]`}>
            <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
              <h3 className="text-3xl font-heading italic text-white">{p.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
});

const Testimonials = React.forwardRef((props, ref) => (
  <Section ref={ref} id="stories">
    <div className="grid md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="lux-glass-strong p-6 md:p-8">
          <div className="flex text-rose-300 mb-6 font-serif text-4xl">"</div>
          <p className="font-body text-white/80 leading-relaxed mb-8 italic text-sm md:text-base">
            Weddingverse made finding our dream photographer incredibly easy. The entire platform feels so premium and curated. We booked our entire vendor team in under a month.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0">
              <img src={`https://i.pravatar.cc/150?img=${i+40}`} alt="Couple" className="w-full h-full object-cover" />
            </div>
            <div>
              <h5 className="font-heading text-base md:text-lg text-white">Sarah & James</h5>
              <p className="text-[10px] md:text-xs font-body tracking-wider text-white/40 uppercase">Married in Tuscany</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
));

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left focus:outline-none">
        <span className="text-[16px] md:text-xl font-heading text-white pr-4">{q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-white/50 shrink-0">
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.2 }}
          >
            <p className="pb-6 font-body text-white/60 leading-relaxed text-sm md:text-base">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "How do we book vendors?", a: "You can securely message and book directly through our platform. Once you submit an inquiry, the vendor will respond via your personalized dashboard." },
    { q: "Can we plan destination weddings?", a: "Absolutely. Our directory includes elite vendors and venues globally, specializing in international and destination wedding experiences." },
    { q: "Do vendors have verified reviews?", a: "Yes. Only couples who have successfully booked and completed their event through WeddingVerse can submit verified reviews." },
    { q: "Can we manage everything online?", a: "Yes. From discovering vendors to signing contracts and managing budgets, your entire journey lives inside your secure dashboard." }
  ];
  return (
    <Section className="max-w-4xl" id="faq">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading italic text-white">Questions & Answers</h2>
      </div>
      <div className="lux-glass px-4 md:px-8 py-2">
        {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
      </div>
    </Section>
  );
};

import { useNavigate } from '@tanstack/react-router';

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const vendorsRef = useRef(null);
  const galleryRef = useRef(null);
  const storiesRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero ref={heroRef} onExploreClick={() => navigate({ to: '/vendors' })} onWatchClick={() => scrollToSection(storiesRef)} />
      <LoveStory />
      <FeaturedServices ref={vendorsRef} />
      <FeaturesGrid />
      <Timeline />
      <Destinations ref={galleryRef} />
      <Testimonials ref={storiesRef} />
      <FAQ />
    </>
  );
}

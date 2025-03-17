import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// TimelineSection component for the alternating timeline sections
const TimelineSection = ({ content, index, isActive }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-10% 0px -10% 0px",
    once: false
  });
  
  // Determine if this section should be on the left or right side
  const isLeft = index % 2 === 0;
  
  // These variants control the animation states
  const variants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -50 : 50, 
      filter: "blur(10px)",
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
    },
    exit: { 
      opacity: 0, 
      x: isLeft ? -50 : 50, 
      filter: "blur(10px)",
    }
  };
  
  return (
    <section 
      id={`section-${index}`} 
      ref={ref}
      className={`min-h-[70vh] w-full flex items-center justify-center ${isLeft ? 'justify-end' : 'justify-start'} relative py-16`}
    >
      {/* Timeline dot on the center line */}
      <motion.div 
        className={`absolute left-1/2 top-1/2 w-6 h-6 bg-rose-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </motion.div>
      
      {/* Content container */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="exit"
        variants={variants}
        transition={{ 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`w-[45%] transform-gpu ${isLeft ? 'mr-12' : 'ml-12'}`}
      >
        <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8 w-full transform-gpu">
          {content}
        </div>
      </motion.div>
    </section>
  );
};

// Activity content component
const ActivityContent = ({ activity }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white/40 backdrop-blur-sm rounded-xl shadow-lg p-5 relative overflow-hidden"
    >
      {/* Animated accent corner */}
      <motion.div 
        className="absolute -top-10 -right-10 w-20 h-20 bg-rose-500/20 rounded-full"
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.3 : 0.2
        }}
      />

      <div className="flex items-center mb-2 relative z-10">
        <motion.div 
          className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mr-3"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1
          }}
          transition={{
            duration: 0.5,
            repeat: isHovered ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </motion.div>
        <h4 className="font-bold text-xl text-rose-600">{activity.dayPart}</h4>
      </div>
      
      <motion.h3 
        className="font-bold text-xl mb-3 relative z-10"
        animate={{
          x: isHovered ? 3 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 300
        }}
      >
        {activity.title}
      </motion.h3>
      
      <p className="text-gray-600 mb-4 relative z-10">{activity.description}</p>
      
      <motion.div 
        className="mt-auto bg-rose-100/70 rounded-lg aspect-video flex items-center justify-center overflow-hidden relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        animate={{
          boxShadow: isHovered ? "0 5px 15px rgba(244, 63, 94, 0.2)" : "0 0 0 rgba(244, 63, 94, 0)"
        }}
      >
        <img 
          src={activity.image || "/placeholder.jpg"} 
          alt={activity.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center text-rose-600 bg-white/30 backdrop-blur-sm">
          <p className="font-semibold">Photo coming soon</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Intro content
const IntroContent = ({ guestName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/50 backdrop-blur-lg rounded-xl shadow-2xl border border-white/40 p-6 md:p-8 w-full max-w-5xl mx-auto transform-gpu relative z-20"
    >
      <h2 className="text-4xl font-bold mb-4 text-rose-600">Welcome, {guestName}!</h2>
      <h3 className="text-3xl font-bold mb-6 text-rose-600">Weekend Itinerary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white/40 backdrop-blur-sm rounded-xl shadow-lg p-5"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
        >
          <h4 className="text-2xl font-bold mb-4 text-rose-600">Location</h4>
          <p className="text-xl mb-2 text-rose-600">Beautiful Boca Raton, FL</p>
          <p className="text-gray-600 mb-4">May 23rd - May 26th</p>
          
          <div className="bg-rose-100/70 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
            <img src="/house.png" alt="Boca Raton beachfront" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white/40 backdrop-blur-sm rounded-xl shadow-lg p-5"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
        >
          <h4 className="text-2xl font-bold mb-4 text-rose-600">Getting There</h4>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <div className="w-5 h-5 bg-rose-500 rounded-full flex-shrink-0 mt-1 mr-3">
                <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <p>Fly into Fort Lauderdale (FLL) or West Palm Beach (PBI) Airports</p>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-rose-500 rounded-full flex-shrink-0 mt-1 mr-3">
                <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <p>Uber to our beachfront accommodation</p>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-rose-500 rounded-full flex-shrink-0 mt-1 mr-3">
                <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <p>Pack your swimsuit, sunscreen, and dancing shoes!</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Timeline component with vertical timeline design
const Timeline = ({ guestName }) => {
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef(null);
  
  // Restructured itinerary as a flat list of activities by parts of day
  const timelineActivities = [
    {
      dayPart: 'Morning',
      day: 'May 23rd',
      title: 'Bagels and bask in the sun',
      description: 'Start the day with delicious bagels and enjoy the beautiful Boca Raton sunshine together.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Afternoon',
      day: 'May 23rd',
      title: 'Pool day',
      description: 'Relax by the pool, soak up the sun, and enjoy refreshing drinks with the girls.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Evening',
      day: 'May 23rd',
      title: 'Movie night',
      description: 'Cozy up for a fun movie night with all of Juliet\'s favorites and some bubbly.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Late Night',
      day: 'May 23rd',
      title: 'Tea',
      description: 'Wind down with some tea and heart-to-heart conversations.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Morning',
      day: 'May 24th',
      title: 'Bagels and walk',
      description: 'Enjoy another morning with bagels followed by a refreshing walk along the beautiful coastline.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Afternoon',
      day: 'May 24th',
      title: 'Beach day',
      description: 'Head to the beach for sun, sand, and ocean fun with the entire group.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Evening',
      day: 'May 24th',
      title: 'Dinner in Del Ray',
      description: 'Get dressed up for a fabulous dinner experience in delightful Del Ray.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Late Night',
      day: 'May 24th',
      title: 'Dancing dancing dancing',
      description: 'Put on your dancing shoes and hit the town for a night of fun and dancing.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Morning',
      day: 'May 25th',
      title: 'Sleep',
      description: 'Sleep in and recover from our fun night out.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Afternoon',
      day: 'May 25th',
      title: 'Pickleball',
      description: 'Get active with a friendly pickleball tournament – no experience necessary!',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Evening',
      day: 'May 25th',
      title: 'Dinner at the club',
      description: 'Enjoy an elegant dinner at a local club with gorgeous views and delicious cuisine.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Late Night',
      day: 'May 25th',
      title: 'PJ party',
      description: 'Back to our accommodations for a classic pajama party with games and treats.',
      image: '/placeholder.jpg'
    },
    {
      dayPart: 'Morning',
      day: 'May 26th',
      title: 'Departure',
      description: 'Everyone flies home after a great weekend. Goodbye hugs and see you at the wedding!',
      image: '/placeholder.jpg'
    }
  ];
  
  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const sectionElements = Array.from(document.querySelectorAll('section'));
      
      for (let i = 0; i < sectionElements.length; i++) {
        const section = sectionElements[i];
        const rect = section.getBoundingClientRect();
        const inView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        
        if (inView) {
          setActiveSection(i);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to section function
  const scrollToSection = (sectionIndex) => {
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div 
      className="fixed inset-0 overflow-y-auto overflow-x-hidden scroll-smooth perspective-1000"
      style={{ 
        backgroundImage: 'radial-gradient(circle at center, #ffe5e5 0%, #fff9f9 50%, #fff5f7 100%)',
        perspective: '1000px'
      }}
    >
      {/* Fixed Background Elements - Animated Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-200"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              filter: `blur(${Math.random() * 10 + 5}px)`
            }}
            animate={{
              y: [Math.random() * 100, Math.random() * -100],
              x: [Math.random() * 100, Math.random() * -100],
              scale: [1, Math.random() * 0.5 + 0.8]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Main Title - Fixed Header */}
      <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-white/90 to-transparent backdrop-blur-sm z-10 py-6">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-rose-600 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Juliet's Bachelorette
        </motion.h1>
      </div>
      
      {/* Back to top button */}
      <motion.button
        className="fixed bottom-8 right-8 z-10 p-3 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-colors"
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(244, 63, 94, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </motion.button>
      
      {/* Vertical timeline line - Fixed behind all content */}
      <div className="fixed left-1/2 top-[45vh] h-[9999px] w-[4px] bg-rose-200 transform -translate-x-1/2 z-[-999]"></div>
      
      {/* Scroll container with timeline sections */}
      <div ref={scrollContainerRef} className="relative pt-16 pb-20">
        {/* Intro Section - Full Width */}
        <section 
          id={`section-0`} 
          className="min-h-[90vh] w-full flex items-center justify-center relative py-16 mb-16"
        >
          <IntroContent guestName={guestName} />
        </section>
        
        {/* Timeline Sections - Each activity gets its own alternating section */}
        {timelineActivities.map((activity, index) => (
          <TimelineSection 
            key={index + 1}
            index={index + 1}
            content={<ActivityContent activity={activity} />}
            isActive={activeSection === index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline; 
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

// Timeline data with lorem ipsum text
const timelineData = [
  {
    date: "May 23rd",
    entries: [
      {
        time: "Morning",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        image: "/placeholder.jpg"
      },
      {
        time: "Afternoon",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
        image: "/placeholder.jpg"
      },
      {
        time: "Evening",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
        image: "/placeholder.jpg"
      },
      {
        time: "Late Night",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
        image: "/placeholder.jpg"
      }
    ]
  },
  {
    date: "May 24th",
    entries: [
      {
        time: "Morning",
        description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        image: "/placeholder.jpg"
      },
      {
        time: "Afternoon",
        description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.",
        image: "/placeholder.jpg"
      },
      {
        time: "Evening",
        description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod.",
        image: "/placeholder.jpg"
      },
      {
        time: "Late Night",
        description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
        image: "/placeholder.jpg"
      }
    ]
  },
  {
    date: "May 25th",
    entries: [
      {
        time: "Morning",
        description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        image: "/placeholder.jpg"
      },
      {
        time: "Afternoon",
        description: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
        image: "/placeholder.jpg"
      },
      {
        time: "Evening",
        description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        image: "/placeholder.jpg"
      },
      {
        time: "Late Night",
        description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
        image: "/placeholder.jpg"
      }
    ]
  },
  {
    date: "May 26th",
    entries: [
      {
        time: "Morning",
        description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        image: "/placeholder.jpg"
      },
      {
        time: "Afternoon",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/placeholder.jpg"
      }
    ]
  }
];

// TimelineItem component for individual timeline entries
const TimelineItem = ({ 
  time, 
  description, 
  image, 
  itemRef,
  containerRef
}) => {
  const { scrollYProgress } = useScroll({
    target: itemRef,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  // Create transforms for opacity that fade in and out based on scroll position
  const opacity = useTransform(scrollYProgress, 
    [0, 0.1, 0.4, 0.7, 1], 
    [0, 1, 1, 0.3, 0]
  );

  return (
    <div 
      ref={itemRef}
      className="flex flex-col md:flex-row justify-start py-10 md:py-16 min-h-[300px]"
    >
      {/* Left side with time and description */}
      <div className="relative pl-20 md:pl-24 pr-4 md:w-1/2">
        {/* Timeline dot */}
        <div className="absolute left-[38px] md:left-[46px] top-1 w-5 h-5 rounded-full bg-white border-2 border-rose-500 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-rose-500" />
        </div>
        
        {/* Content that fades with scroll */}
        <motion.div style={{ opacity }} className="space-y-2">
          <h4 className="text-lg md:text-xl font-semibold text-rose-600">
            {time}
          </h4>
          <p className="text-sm md:text-base text-gray-600">
            {description}
          </p>
        </motion.div>
      </div>
      
      {/* Right side with image */}
      <motion.div 
        style={{ opacity }} 
        className="pl-20 md:pl-4 pr-4 mt-4 md:mt-0 md:w-1/2"
      >
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-rose-200 shadow-md">
          <div className="absolute inset-0 bg-rose-50 flex items-center justify-center">
            <img 
              src={image}
              alt="Timeline event"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-rose-600 bg-white/30 backdrop-blur-sm">
              <p className="font-semibold">Photo coming soon</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main Timeline component
const Timeline = ({ guestName }) => {
  const containerRef = useRef(null);
  const [entries, setEntries] = useState([]);
  
  // Process timeline data and create refs for each entry
  useEffect(() => {
    // Calculate total number of entries
    const totalEntries = timelineData.reduce((total, day) => total + day.entries.length, 0);
    
    // Create an array of entries with React.createRef instead of useRef
    const allEntries = [];
    
    timelineData.forEach(day => {
      day.entries.forEach(entry => {
        allEntries.push({
          ...entry,
          ref: React.createRef() // Use createRef instead of useRef
        });
      });
    });
    
    setEntries(allEntries);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-y-auto overflow-x-hidden scroll-smooth"
      style={{ 
        backgroundImage: 'radial-gradient(circle at center, #ffe5e5 0%, #fff9f9 50%, #fff5f7 100%)',
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
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm py-4 border-b border-rose-200">
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

      {/* Welcome section */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
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
      </div>

      {/* Timeline section */}
      <div className="relative max-w-7xl mx-auto pb-20">
        {/* Vertical timeline line */}
        <div className="absolute left-10 md:left-12 top-0 bottom-0 w-[2px] bg-rose-200" />
        
        {/* Timeline content by date */}
        {timelineData.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-16">
            {/* Day heading - sticky */}
            <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-sm py-4 border-y border-rose-200">
              <h3 className="text-xl md:text-3xl font-bold text-rose-600 pl-20 md:pl-24">
                {day.date}
              </h3>
            </div>
            
            {/* Timeline items for this day */}
            {day.entries.map((entry, entryIndex) => {
              const entryFullIndex = timelineData.slice(0, dayIndex).reduce((acc, day) => acc + day.entries.length, 0) + entryIndex;
              const currentRef = entries[entryFullIndex]?.ref;
              
              return currentRef ? (
                <TimelineItem 
                  key={entryIndex}
                  time={entry.time}
                  description={entry.description}
                  image={entry.image}
                  itemRef={currentRef}
                  containerRef={containerRef}
                />
              ) : null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 
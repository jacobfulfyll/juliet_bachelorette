import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import React from 'react';
import { 
  AnimatedSection, 
  ParallaxSection, 
  ScrollRevealContainer, 
  RotatingCard, 
  FloatingElement,
  StaggeredEntry,
  ScrollAnimationProvider
} from './ScrollAnimations';

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
  index
}) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row justify-start py-10 md:py-16 min-h-[300px]"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: index % 2 === 0 ? 50 : -50, scale: 0.9 }}
      transition={{ duration: 0.7 }}
    >
      {/* Left side with time and description */}
      <div className="relative pl-20 md:pl-24 pr-4 md:w-1/2">
        {/* Timeline dot with pulsating effect */}
        <motion.div 
          className="absolute left-[38px] md:left-[46px] top-1 w-5 h-5 rounded-full bg-white border-2 border-rose-500 flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(244, 63, 94, 0)",
              "0 0 0 10px rgba(244, 63, 94, 0.3)",
              "0 0 0 0 rgba(244, 63, 94, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <div className="h-2 w-2 rounded-full bg-rose-500" />
        </motion.div>
        
        {/* Content */}
        <div className="space-y-2">
          <h4 className="text-lg md:text-xl font-semibold text-rose-600">
            {time}
          </h4>
          <p className="text-sm md:text-base text-gray-600">
            {description}
          </p>
        </div>
      </div>
      
      {/* Right side with image */}
      <div className="pl-20 md:pl-4 pr-4 mt-4 md:mt-0 md:w-1/2">
        <motion.div 
          className="relative w-full aspect-video rounded-lg overflow-hidden border border-rose-200 shadow-md"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(244, 63, 94, 0.2)" }}
          transition={{ duration: 0.3 }}
        >
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
        </motion.div>
      </div>
    </motion.div>
  );
};

// Automatic Timeline component with auto-progression
const AutomaticTimeline = ({ timelineData }) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(5); // seconds per entry

  // Get current day and entry
  const currentDay = timelineData[currentDayIndex];
  const currentEntry = currentDay?.entries[currentEntryIndex];
  
  // Calculate the overall progress
  const totalEntries = timelineData.reduce((acc, day) => acc + day.entries.length, 0);
  const currentOverallIndex = timelineData
    .slice(0, currentDayIndex)
    .reduce((acc, day) => acc + day.entries.length, 0) + currentEntryIndex;
  const progress = (currentOverallIndex / totalEntries) * 100;

  // Auto-progress to next entry
  useEffect(() => {
    if (!playing) return;
    
    const timer = setTimeout(() => {
      // Check if we need to go to the next day
      if (currentEntryIndex >= currentDay.entries.length - 1) {
        if (currentDayIndex < timelineData.length - 1) {
          setCurrentDayIndex(prev => prev + 1);
          setCurrentEntryIndex(0);
        } else {
          // Loop back to the beginning when reached the end
          setCurrentDayIndex(0);
          setCurrentEntryIndex(0);
        }
      } else {
        // Go to the next entry in the same day
        setCurrentEntryIndex(prev => prev + 1);
      }
    }, speed * 1000);
    
    return () => clearTimeout(timer);
  }, [currentDay, currentDayIndex, currentEntryIndex, playing, speed, timelineData]);

  // Handle user controls
  const handlePrevious = () => {
    if (currentEntryIndex > 0) {
      setCurrentEntryIndex(prev => prev - 1);
    } else if (currentDayIndex > 0) {
      setCurrentDayIndex(prev => prev - 1);
      setCurrentEntryIndex(timelineData[currentDayIndex - 1].entries.length - 1);
    }
  };

  const handleNext = () => {
    if (currentEntryIndex < currentDay.entries.length - 1) {
      setCurrentEntryIndex(prev => prev + 1);
    } else if (currentDayIndex < timelineData.length - 1) {
      setCurrentDayIndex(prev => prev + 1);
      setCurrentEntryIndex(0);
    }
  };

  const togglePlayPause = () => {
    setPlaying(prev => !prev);
  };

  return (
    <div className="relative max-w-7xl mx-auto pb-20">
      {/* Vertical timeline line with glowing effect */}
      <motion.div 
        className="absolute left-10 md:left-12 top-0 bottom-0 w-[2px] bg-rose-200"
        style={{ 
          background: "linear-gradient(0deg, transparent, #f9a8d4, #f9a8d4, transparent)" 
        }}
        animate={{ 
          boxShadow: ["0 0 5px 0 rgba(244, 63, 94, 0.3)", "0 0 15px 2px rgba(244, 63, 94, 0.5)", "0 0 5px 0 rgba(244, 63, 94, 0.3)"],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Day heading */}
      <motion.div
        className="sticky top-24 z-30 bg-white/80 backdrop-blur-sm py-4 border-y border-rose-200"
        key={`day-${currentDayIndex}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl md:text-3xl font-bold text-rose-600 pl-20 md:pl-24">
          {currentDay.date}
        </h3>
      </motion.div>
      
      {/* Timeline item */}
      <AnimatePresence mode="wait">
        <div key={`day-${currentDayIndex}-entry-${currentEntryIndex}`}>
          <TimelineItem 
            time={currentEntry.time}
            description={currentEntry.description}
            image={currentEntry.image}
            index={currentOverallIndex}
          />
        </div>
      </AnimatePresence>
      
      {/* Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-lg rounded-full shadow-lg px-6 py-3 flex items-center space-x-4">
        <motion.button
          className="text-rose-600 hover:text-rose-800 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          aria-label="Previous entry"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </motion.button>
        
        <motion.button
          className="bg-rose-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-rose-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlayPause}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </motion.button>
        
        <motion.button
          className="text-rose-600 hover:text-rose-800 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          aria-label="Next entry"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </motion.button>
        
        <div className="relative w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-rose-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className="text-xs text-rose-600 hover:text-rose-800 transition-colors"
            onClick={() => setSpeed(prev => Math.min(prev + 1, 10))}
          >
            -
          </button>
          <span className="text-xs text-rose-600">Speed</span>
          <button 
            className="text-xs text-rose-600 hover:text-rose-800 transition-colors"
            onClick={() => setSpeed(prev => Math.max(prev - 1, 1))}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Timeline component
const Timeline = ({ guestName }) => {
  return (
    <ScrollAnimationProvider>
      <div 
        className="fixed inset-0 overflow-y-auto overflow-x-hidden"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, #ffe5e5 0%, #fff9f9 50%, #fff5f7 100%)',
        }}
      >
        {/* Fixed Background Elements - Animated Particles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <FloatingElement
              key={i}
              className="absolute rounded-full bg-rose-200"
              amplitude={Math.random() * 60 + 30}
              duration={Math.random() * 15 + 10}
              style={{
                width: Math.random() * 40 + 10,
                height: Math.random() * 40 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                filter: `blur(${Math.random() * 10 + 5}px)`
              }}
            />
          ))}
        </div>
        
        {/* Main Title - Fixed Header */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm py-4 border-b border-rose-200">
          <AnimatedSection 
            animationType="scale"
            className="text-4xl md:text-5xl font-bold text-rose-600 text-center"
          >
            Juliet's Bachelorette
          </AnimatedSection>
        </div>

        {/* Welcome section */}
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <RotatingCard className="p-6 md:p-8 w-full max-w-5xl mx-auto">
            <AnimatedSection 
              animationType="fade"
              className="bg-white/50 backdrop-blur-lg rounded-xl shadow-2xl border border-white/40 p-6 md:p-8 transform-gpu relative z-20"
            >
              <h2 className="text-4xl font-bold mb-4 text-rose-600">Welcome, {guestName || 'Guest'}!</h2>
              <h3 className="text-3xl font-bold mb-6 text-rose-600">Weekend Itinerary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedSection 
                  animationType="slide"
                  direction="left"
                  delay={0.3}
                  className="bg-white/40 backdrop-blur-sm rounded-xl shadow-lg p-5"
                  whileHover={{ scale: 1.03 }}
                >
                  <h4 className="text-2xl font-bold mb-4 text-rose-600">Location</h4>
                  <p className="text-xl mb-2 text-rose-600">Beautiful Boca Raton, FL</p>
                  <p className="text-gray-600 mb-4">May 23rd - May 26th</p>
                  
                  <div className="bg-rose-100/70 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
                    <img src="/house.png" alt="Boca Raton beachfront" className="w-full h-full object-cover" />
                  </div>
                </AnimatedSection>
                
                <AnimatedSection 
                  animationType="slide"
                  direction="right"
                  delay={0.4}
                  className="bg-white/40 backdrop-blur-sm rounded-xl shadow-lg p-5"
                >
                  <h4 className="text-2xl font-bold mb-4 text-rose-600">Getting There</h4>
                  <StaggeredEntry>
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
                  </StaggeredEntry>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </RotatingCard>
        </div>

        {/* Timeline section */}
        <AutomaticTimeline timelineData={timelineData} />
      </div>
    </ScrollAnimationProvider>
  );
};

export default Timeline; 
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
        title: "Bagels and Coffee",
        description: "Wake up in beautiful sunny Florida with a cup of coffee and some New York quality bagels.",
        image: "/st_andrews_entry.png"
      },
      {
        time: "Afternoon",
        title: "Pool Day",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
        image: "/pool.png"
      },
      {
        time: "Evening",
        title: "Movie Night",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
        image: "/movie.png"
      },
      {
        time: "Late Night",
        title: "Tea and Tea",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
        image: "/house.png"
      }
    ]
  },
  {
    date: "May 24th",
    entries: [
      {
        time: "Morning",
        title: "Morning Walk",
        description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        image: "/bedroom.jpeg"
      },
      {
        time: "Afternoon",
        title: "Beach Day",
        description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.",
        image: "/beach.png"
      },
      {
        time: "Evening",
        title: "Del Ray Dinner",
        description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod.",
        image: "/delray.png"
      },
      {
        time: "Late Night",
        title: "Dancing Dancing Dancing",
        description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
        image: "/dancing.png"
      }
    ]
  },
  {
    date: "May 25th",
    entries: [
      {
        time: "Morning",
        title: "Donec sollicitudin molestie malesuada",
        description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        image: "/passed_out.png"
      },
      {
        time: "Chill and Walk",
        title: "Quisque velit nisi pretium ut",
        description: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
        image: "/versailles.png"
      },
      {
        time: "Evening",
        title: "Dinner @ The Club",
        description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        image: "/dining.png"
      },
      {
        time: "Late Night",
        title: "Relax and Enjoy",
        description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
        image: "/games.jpeg"
      }
    ]
  },
  {
    date: "May 26th",
    entries: [
      {
        time: "Morning",
        title: "Bye Bye Boca",
        description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        image: "/airport.png"
      },
      // {
      //   time: "Afternoon",
      //   title: "Cras ultricies ligula sed magna",
      //   description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      //   image: "/placeholder.jpg"
      // }
    ]
  }
];

// TimelineItem component for individual timeline entries
const TimelineItem = ({ 
  time, 
  description,
  title,
  image, 
  index,
  date,
  totalSlides
}) => {
  // Calculate a position factor (0-1) based on where we are in the timeline
  const positionFactor = index / totalSlides;
  
  // Determine layout variation based on position in timeline
  // As we progress, we'll vary the layout for visual interest
  const layoutVariation = React.useMemo(() => {
    if (index % 4 === 0) {
      return "centered"; // Date centered above, image below
    } else if (index % 4 === 1) {
      return "left-right"; // Date left, image right (default)
    } else if (index % 4 === 2) {
      return "right-left"; // Date right, image left (reversed)
    } else {
      return "overlay"; // Date overlaid on image
    }
  }, [index]);

  // Check if time is Morning for special animation
  const isMorning = time === "Morning";

  return (
    <motion.div 
      className={`flex flex-col w-full h-full px-[5%] justify-center ${layoutVariation === "centered" ? "items-center" : "items-start"}`}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.97 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {layoutVariation === "centered" && (
        <div className="w-full flex flex-col items-center">
          {/* Date and Time - Centered layout */}
          <div className="flex flex-col items-center text-center mb-6">
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              <h3 className="text-2xl md:text-4xl font-bold text-rose-600 relative inline-block">
                {date}
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-rose-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </h3>
            </motion.div>
            
            <motion.h4 
              className="text-xl md:text-2xl font-semibold text-rose-600 mb-4 relative"
              whileHover={{ scale: 1.05 }}
            >
              {time}
              {isMorning ? (
                <motion.span 
                  className="absolute -right-8 -top-2 text-amber-400"
                  animate={{ 
                    opacity: [0.7, 1, 0.7],
                    y: [-2, 2, -2],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  🌞
                </motion.span>
              ) : (
                <motion.span 
                  className="absolute -right-6 -top-1 text-yellow-400"
                  animate={{ 
                    opacity: [0, 1, 0],
                    rotate: [0, 15, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  ✨
                </motion.span>
              )}
            </motion.h4>
          </div>
          
          {/* Image below date in centered layout - now wider */}
          <motion.div 
            className="relative w-full max-w-5xl rounded-xl overflow-hidden border border-rose-200 shadow-xl"
            whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(244, 63, 94, 0.3)" }}
            style={{ 
              height: "calc(60vh - 180px)",
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              hover: { duration: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-rose-50 flex items-center justify-center">
              <img 
                src={image}
                alt="Timeline event"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          {/* Title and Description below image in centered layout */}
          <motion.div 
            className="mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <h5 className="text-lg md:text-xl font-bold text-black mb-2 text-center">{title}</h5>
            <motion.p className="text-base md:text-lg text-gray-600 leading-relaxed bg-white/60 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-rose-100 text-center">
              {description}
            </motion.p>
          </motion.div>
        </div>
      )}
      
      {(layoutVariation === "left-right" || layoutVariation === "right-left") && (
        <div className={`flex flex-col md:flex-row w-full justify-center items-center gap-8 ${layoutVariation === "right-left" ? "md:flex-row-reverse" : ""}`}>
          {/* Date/Time/Description side - now narrower */}
          <div className={`flex flex-col w-full md:w-[30%] ${layoutVariation === "right-left" ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              <h3 className="text-2xl md:text-4xl font-bold text-rose-600 relative inline-block">
                {date}
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-rose-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </h3>
            </motion.div>
            
            <motion.h4 
              className="text-xl md:text-2xl font-semibold text-rose-600 mb-4 relative"
              whileHover={{ scale: 1.05 }}
            >
              {time}
              {isMorning ? (
                <motion.span 
                  className={`absolute ${layoutVariation === "right-left" ? "-left-8" : "-right-8"} -top-2 text-amber-400`}
                  animate={{ 
                    opacity: [0.7, 1, 0.7],
                    y: [-2, 2, -2],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  🌞
                </motion.span>
              ) : (
                <motion.span 
                  className={`absolute ${layoutVariation === "right-left" ? "-left-6" : "-right-6"} -top-1 text-yellow-400`}
                  animate={{ 
                    opacity: [0, 1, 0],
                    rotate: [0, 15, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  ✨
                </motion.span>
              )}
            </motion.h4>
            
            <motion.div 
              className="space-y-2 max-w-md"
              initial={{ opacity: 0, x: layoutVariation === "right-left" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <h5 className={`text-lg font-bold text-black mb-2 ${layoutVariation === "right-left" ? "md:text-right" : "md:text-left"}`}>{title}</h5>
              <motion.p 
                className={`text-sm md:text-base text-gray-600 leading-relaxed bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-rose-100 ${layoutVariation === "right-left" ? "md:text-right" : "md:text-left"}`}
              >
                {description}
              </motion.p>
            </motion.div>
          </div>
          
          {/* Image side - now wider and taller */}
          <motion.div 
            className="w-full md:w-[60%]"
            initial={{ opacity: 0, x: layoutVariation === "right-left" ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <motion.div 
              className="relative w-full rounded-xl overflow-hidden border border-rose-200 shadow-xl"
              whileHover={{ scale: 1.03, boxShadow: "0 15px 40px rgba(244, 63, 94, 0.3)" }}
              style={{ 
                height: "calc(70vh - 100px)", // Made taller
              }}
              transition={{ 
                hover: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-rose-50 flex items-center justify-center">
                <img 
                  src={image}
                  alt="Timeline event"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
      
      {layoutVariation === "overlay" && (
        <div className="w-full flex flex-col items-center">
          {/* Overlay layout - Image with content overlay */}
          <motion.div 
            className="relative w-full max-w-5xl rounded-xl overflow-hidden border border-rose-200 shadow-xl"
            whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(244, 63, 94, 0.3)" }}
            style={{ 
              height: "calc(70vh - 180px)",
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2,
              hover: { duration: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-rose-50 flex items-center justify-center">
              <img 
                src={image}
                alt="Timeline event"
                className="w-full h-full object-cover"
              />
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div 
                  className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-rose-100 max-w-xl mx-auto text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="text-2xl md:text-4xl font-bold text-rose-600 mb-2 relative inline-block">
                    {date}
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-rose-300 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    />
                  </h3>
                  
                  <h4 className="text-xl md:text-2xl font-semibold text-rose-600 mb-4 relative">
                    {time}
                    {isMorning && (
                      <motion.span 
                        className="absolute -right-8 -top-2 text-amber-400"
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          y: [-2, 2, -2],
                          scale: [0.9, 1.1, 0.9]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      >
                        🌞
                      </motion.span>
                    )}
                  </h4>
                  
                  <h5 className="text-lg md:text-xl font-bold text-black mb-2">{title}</h5>
                  <p className="text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

// WelcomeSlide component for the first slide
const WelcomeSlide = ({ guestName }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center px-4 relative">
      {/* Title - Only appears on first page */}
      <AnimatedSection 
        animationType="scale"
        className="text-4xl md:text-5xl font-bold text-rose-600 text-center mb-8"
      >
        Juliet's Bachelorette
      </AnimatedSection>
      
      <RotatingCard className="p-6 md:p-8 w-full max-w-5xl mx-auto">
        <AnimatedSection 
          animationType="fade"
          className="bg-white/50 backdrop-blur-lg rounded-xl shadow-2xl border border-white/40 p-6 md:p-8 transform-gpu relative z-20"
        >
          <h2 className="text-4xl font-bold mb-4 text-rose-600">Welcome, {guestName || 'Guest'}!</h2>
          
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
                <img src="/boca_sunset.jpg" alt="Boca Raton beachfront" className="w-full h-full object-cover" />
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
  );
};

// ViewportCarousel component
const ViewportCarousel = ({ timelineData, guestName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  
  // Flatten timeline data into slides
  const slides = React.useMemo(() => {
    const allSlides = [];
    
    // Add welcome slide as the first slide
    allSlides.push({ type: 'welcome' });
    
    // Add timeline entries as slides
    timelineData.forEach(day => {
      day.entries.forEach(entry => {
        allSlides.push({
          type: 'timeline',
          date: day.date,
          ...entry
        });
      });
    });
    
    return allSlides;
  }, [timelineData]);
  
  // Show navigation arrows after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrows(true);
    }, 5000); // 5 seconds delay
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle navigation
  const handlePrevious = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };
  
  // Handle dot navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  // Calculate timeline progress percentage
  const progressPercentage = ((currentSlide) / (slides.length - 1)) * 100;

  // Get current day based on slide
  const getCurrentDay = () => {
    if (currentSlide === 0) return null;
    return slides[currentSlide].date;
  };

  const currentDay = getCurrentDay();
  
  return (
    <div className="h-screen relative overflow-hidden">
      {/* Improved timeline navigation */}
      {currentSlide > 0 && (
        <div className="absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-30 px-4 py-3">
          <div className="max-w-6xl mx-auto">
            {/* Timeline bar */}
            <div className="relative h-2 bg-rose-100 rounded-full mb-1">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-rose-500"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(244, 63, 94, 0.3)",
                      "0 0 0 4px rgba(244, 63, 94, 0.2)",
                      "0 0 0 0 rgba(244, 63, 94, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </motion.div>
            </div>
            
            {/* Day indicators */}
            <div className="flex justify-between items-center">
              {timelineData.map((day, index) => {
                // Check if this day is the current day
                const isCurrentDay = currentDay === day.date;
                
                return (
                  <motion.button
                    key={`day-${index}`}
                    className={`relative px-4 py-1 rounded-full text-sm font-medium transition-all ${
                      isCurrentDay 
                        ? 'text-rose-600 font-bold' 
                        : 'text-gray-500 hover:text-rose-500'
                    }`}
                    onClick={() => {
                      // Find first slide index for this day
                      const firstSlideIndex = slides.findIndex(slide => 
                        slide.type === 'timeline' && slide.date === day.date
                      );
                      if (firstSlideIndex !== -1) {
                        goToSlide(firstSlideIndex);
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {day.date}
                    {isCurrentDay && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full"
                        layoutId="currentDayIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Slides - adjust top padding to accommodate the new header */}
      <AnimatePresence mode="wait">
        <div 
          key={`slide-${currentSlide}`} 
          className="h-full flex items-center justify-center"
          style={{ paddingTop: currentSlide > 0 ? '80px' : '0' }}
        >
          {slides[currentSlide].type === 'welcome' ? (
            <WelcomeSlide guestName={guestName} />
          ) : (
            <div className="h-screen w-full flex items-center justify-center">
              <TimelineItem 
                time={slides[currentSlide].time}
                description={slides[currentSlide].description}
                title={slides[currentSlide].title}
                image={slides[currentSlide].image}
                index={currentSlide}
                date={slides[currentSlide].date}
                totalSlides={slides.length - 1} // Exclude welcome slide
              />
            </div>
          )}
        </div>
      </AnimatePresence>
      
      {/* Enhanced Navigation Arrows - always visible */}
      <AnimatePresence>
        {showArrows && (
          <>
            {/* Left Arrow - more prominent */}
            <motion.button
              className={`absolute left-6 top-1/2 transform -translate-y-1/2 bg-white text-rose-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-40 ${currentSlide === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-rose-50'}`}
              whileHover={currentSlide > 0 ? { scale: 1.1, x: -5 } : {}}
              whileTap={currentSlide > 0 ? { scale: 0.95 } : {}}
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: currentSlide === 0 ? 0.4 : 1, 
                x: 0,
                boxShadow: currentSlide === 0 ? "0 4px 6px rgba(0,0,0,0.1)" : ["0 4px 6px rgba(0,0,0,0.1)", "0 8px 15px rgba(244, 63, 94, 0.2)", "0 4px 6px rgba(0,0,0,0.1)"]
              }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ 
                duration: 0.3,
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </motion.button>
            
            {/* Right Arrow - more prominent */}
            <motion.button
              className={`absolute right-6 top-1/2 transform -translate-y-1/2 bg-white text-rose-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-40 ${currentSlide === slides.length - 1 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-rose-50'}`}
              whileHover={currentSlide < slides.length - 1 ? { scale: 1.1, x: 5 } : {}}
              whileTap={currentSlide < slides.length - 1 ? { scale: 0.95 } : {}}
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1}
              aria-label="Next slide"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: currentSlide === slides.length - 1 ? 0.4 : 1, 
                x: 0,
                boxShadow: currentSlide === slides.length - 1 ? "0 4px 6px rgba(0,0,0,0.1)" : ["0 4px 6px rgba(0,0,0,0.1)", "0 8px 15px rgba(244, 63, 94, 0.2)", "0 4px 6px rgba(0,0,0,0.1)"]
              }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ 
                duration: 0.3,
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>
          </>
        )}
      </AnimatePresence>
      
      {/* Minimalist pagination dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/50 backdrop-blur-sm rounded-full shadow-md px-4 py-1.5 flex items-center space-x-1">
        {slides.map((_, index) => (
          <motion.button
            key={`dot-${index}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-rose-500 w-3' : 'bg-rose-200 hover:bg-rose-300'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Main Timeline component
const Timeline = ({ guestName }) => {
  return (
    <ScrollAnimationProvider>
      <div 
        className="fixed inset-0 overflow-hidden"
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
        
        {/* Main Viewport Carousel */}
        <ViewportCarousel timelineData={timelineData} guestName={guestName} />
      </div>
    </ScrollAnimationProvider>
  );
};

export default Timeline; 
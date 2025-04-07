import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Welcome = ({ name, onContinue }) => {
  const [imageExists, setImageExists] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  // Different welcome messages based on the person's name
  const getPersonalizedMessage = () => {
    const messages = {
      'Isabel': "Isabel! Thank you for being such an amazing friend to Juliet. Your presence will make this weekend extra special!",
      'Kate': "Kate! Your adventure with Juliet continues with this exciting bachelorette weekend. Get ready for the fun!",
      'Erica': "Erica! Juliet is so grateful to have you as part of her bachelorette celebration. Let's make it unforgettable!",
      'Nikki': "Nikki! Get ready for an incredible weekend celebrating Juliet. Your friendship means so much to her!",
      'Bethany': "Bethany! Juliet is beyond excited to have you at her bachelorette. Your friendship is truly cherished!",
      'Mary Pat': "Mary Pat! Juliet is thrilled that you'll be part of her bachelorette weekend. Your friendship means the world to her!",
      'Madeleine': "Madeleine! Juliet is so happy you'll be part of her bachelorette celebration. Let's make it a weekend to remember!",
      'Sasha': "Sasha! Juliet is beyond excited to have you at her bachelorette. Your friendship is truly cherished!",
      'Bea': "Bea! Juliet is thrilled that you'll be part of her bachelorette weekend. Your friendship means the world to her!",
    };
    
    return messages[name] || `${name}! Juliet is so happy you'll be part of her bachelorette celebration!`;
  };

  useEffect(() => {
    // Check if image exists for the person
    const checkImage = async () => {
      try {
        const imagePath = `/person/${name.toLowerCase()}.jpg`;
        const res = await fetch(imagePath, { method: 'HEAD' });
        setImageExists(res.ok);
      } catch (error) {
        setImageExists(false);
      }
    };
    
    checkImage();
    
    // Show continue button after 5 seconds
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [name]);

  return (
    <motion.div 
      className="max-w-xl w-full mx-auto rounded-xl p-8 shadow-xl bg-white/90 backdrop-blur-sm text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        delay: .5,
        duration: 3,
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-rose-600 mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          delay: 1.5, 
          duration: 2.5,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        Welcome, {name}!
      </motion.h2>
      
      {imageExists && (
        <motion.div 
          className="mb-6 flex justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 2, 
            duration: 2,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <Image 
            src={`/person/${name.toLowerCase()}.jpg`} 
            alt={`Photo of ${name}`}
            width={200}
            height={200}
            className="rounded-full object-cover border-4 border-rose-200"
            priority
          />
        </motion.div>
      )}
      
      <motion.p 
        className="text-gray-700 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          delay: imageExists ? 2 : 2.5, 
          duration: 2,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {getPersonalizedMessage()}
      </motion.p>
      
      <div className="h-12 flex justify-center items-center relative">
        <AnimatePresence mode="wait">
          {!showButton ? (
            <motion.div
              key="loading"
              className="flex justify-center items-center absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: .5,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* <div className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-500">Loading your experience...</span>
              </div> */}
            </motion.div>
          ) : (
            <motion.button
              key="button"
              className="border border-rose-300/50 text-rose-500/80 bg-white/40 backdrop-blur-sm rounded-full text-sm font-normal shadow-sm hover:bg-rose-50/50 hover:text-rose-600 hover:border-rose-400/70 transition-all absolute inset-0"
              onClick={onContinue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1], 
                delay: 0.1
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.5 } 
              }}
              whileTap={{ scale: 0.99 }}
            >
              Continue
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Welcome; 
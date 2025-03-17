import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Welcome = ({ name, onContinue }) => {
  // Different welcome messages based on the person's name
  const getPersonalizedMessage = () => {
    const messages = {
      'Isabel': "Isabel! Thank you for being such an amazing friend to Juliet. Your presence will make this weekend extra special!",
      'Nicolle': "Nicolle! Juliet is thrilled that you'll be part of her bachelorette weekend. Your friendship means the world to her!",
      'Kate': "Kate! Your adventure with Juliet continues with this exciting bachelorette weekend. Get ready for the fun!",
      'Erica': "Erica! Juliet is so grateful to have you as part of her bachelorette celebration. Let's make it unforgettable!",
      'Alex': "Alex! Your presence at Juliet's bachelorette will bring so much joy. She can't wait to celebrate with you!",
      'Nikki': "Nikki! Get ready for an incredible weekend celebrating Juliet. Your friendship means so much to her!",
      'Bethany': "Bethany! Juliet is beyond excited to have you at her bachelorette. Your friendship is truly cherished!"
    };
    
    return messages[name] || `${name}! Juliet is so happy you'll be part of her bachelorette celebration!`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <motion.div 
      className="max-w-xl w-full mx-auto rounded-xl p-8 shadow-xl bg-white/90 backdrop-blur-sm text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-rose-600 mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome, {name}!
      </motion.h2>
      
      <motion.p 
        className="text-gray-700 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {getPersonalizedMessage()}
      </motion.p>
      
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="relative inline-flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-500">Loading your experience...</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Welcome; 
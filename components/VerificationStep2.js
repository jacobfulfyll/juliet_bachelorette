import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VerificationStep2 = ({ onVerify }) => {
  const [selectedName, setSelectedName] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const validNames = [
    'Isabel',
    'Nicolle',
    'Kate',
    'Erica',
    'Alex',
    'Nikki',
    'Bethany'
  ];

  const handleNameSelect = (name) => {
    if (isVerifying) return;
    
    setSelectedName(name);
    setIsVerifying(true);
    setError('');
    
    // Wait a moment to show the flicker effect before transitioning
    setTimeout(() => {
      onVerify(name);
    }, 600);
  };

  return (
    <motion.div 
      className="max-w-md w-full mx-auto rounded-xl p-8 shadow-xl bg-white/90 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl md:text-3xl font-bold text-center mb-6 text-rose-600"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome Back!
      </motion.h2>
      
      <motion.p 
        className="text-center mb-8 text-gray-600"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Select your name to continue:
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-4">
          <div className="mt-2 grid grid-cols-1 gap-2">
            {validNames.map((name) => (
              <AnimatePresence key={name}>
                <motion.button
                  type="button"
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    selectedName === name && isVerifying
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-rose-400 hover:bg-rose-50'
                  }`}
                  onClick={() => handleNameSelect(name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  animate={selectedName === name && isVerifying ? {
                    scale: [1, 1.05, 1],
                    backgroundColor: ['rgb(244, 63, 94)', 'rgb(255, 255, 255)', 'rgb(244, 63, 94)'],
                    color: ['rgb(255, 255, 255)', 'rgb(244, 63, 94)', 'rgb(255, 255, 255)'],
                    transition: { 
                      duration: 0.5,
                      repeat: 0, 
                      repeatType: "loop" 
                    }
                  } : {}}
                >
                  {name}
                  {selectedName === name && isVerifying && (
                    <motion.span 
                      className="ml-2 inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </motion.span>
                  )}
                </motion.button>
              </AnimatePresence>
            ))}
          </div>
          
          {error && (
            <motion.p 
              className="mt-2 text-sm text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VerificationStep2; 
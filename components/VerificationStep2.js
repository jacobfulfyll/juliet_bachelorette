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
    
    // Wait for the slower flicker effect to complete before transitioning
    setTimeout(() => {
      onVerify(name);
    }, 2500);
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
                      ? 'border-rose-400'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-rose-400 hover:bg-rose-50'
                  }`}
                  onClick={() => handleNameSelect(name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  animate={selectedName === name && isVerifying ? {
                    scale: [1, 1.02, 1, 1.02, 1],
                    boxShadow: [
                      '0 0 0 rgba(244, 63, 94, 0)',
                      '0 0 8px rgba(244, 63, 94, 0.4)', 
                      '0 0 4px rgba(244, 63, 94, 0.2)',
                      '0 0 8px rgba(244, 63, 94, 0.4)',
                      '0 0 0 rgba(244, 63, 94, 0)'
                    ],
                    backgroundColor: [
                      'rgba(255, 255, 255, 1)',
                      'rgba(254, 242, 242, 1)', 
                      'rgba(251, 231, 231, 1)',
                      'rgba(254, 242, 242, 1)',
                      'rgba(255, 255, 255, 1)'
                    ],
                    color: [
                      'rgba(107, 114, 128, 1)',
                      'rgba(225, 29, 72, 0.8)', 
                      'rgba(225, 29, 72, 0.9)',
                      'rgba(225, 29, 72, 0.8)',
                      'rgba(107, 114, 128, 1)'
                    ],
                    borderColor: [
                      'rgba(209, 213, 219, 1)',
                      'rgba(244, 63, 94, 0.6)', 
                      'rgba(244, 63, 94, 0.8)',
                      'rgba(244, 63, 94, 0.6)',
                      'rgba(209, 213, 219, 1)'
                    ],
                    transition: { 
                      duration: 2.5,
                      repeat: 1,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      times: [0, 0.25, 0.5, 0.75, 1]
                    }
                  } : {}}
                >
                  {name}
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
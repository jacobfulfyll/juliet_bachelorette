import { useState } from 'react';
import { motion } from 'framer-motion';

const VerificationStep1 = ({ onVerify }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const validAnswers = [
    'an august bride',
    'august bride',
    'august',
    'an august'
  ];

  const handleVerify = (e) => {
    e.preventDefault();
    
    setIsVerifying(true);
    
    setTimeout(() => {
      const normalizedAnswer = answer.trim().toLowerCase();
      
      if (validAnswers.includes(normalizedAnswer)) {
        setError('');
        onVerify();
      } else {
        setError('Incorrect answer. Please try again.');
      }
      
      setIsVerifying(false);
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
        Welcome to Juliet's Bachelorette
      </motion.h2>
      
      <motion.p 
        className="text-center mb-8 text-gray-600"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        To continue, please answer this question:
      </motion.p>
      
      <motion.form 
        onSubmit={handleVerify}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            What type of bride is Juliet?
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            required
          />
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
        
        <motion.button
          type="submit"
          className="w-full py-2 px-4 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition duration-200 mt-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isVerifying}
        >
          {isVerifying ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </div>
          ) : 'Continue'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default VerificationStep1; 
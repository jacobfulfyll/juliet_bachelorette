import { useState, useCallback } from 'react';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';

import VerificationStep1 from '../components/VerificationStep1';
import VerificationStep2 from '../components/VerificationStep2';
import Welcome from '../components/Welcome';
import Timeline from '../components/Timeline';
import BackgroundAnimation from '../components/BackgroundAnimation';

export default function Home() {
  const [step, setStep] = useState('verification1');
  const [guestName, setGuestName] = useState('');
  
  // Handle verification flow
  const handleVerificationStep1 = useCallback(() => {
    setStep('verification2');
  }, []);
  
  const handleVerificationStep2 = useCallback((name) => {
    setGuestName(name);
    setStep('welcome');
  }, []);
  
  const handleWelcomeContinue = useCallback(() => {
    setStep('timeline');
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <Head>
        <title>Juliet's Bachelorette Party</title>
        <meta name="description" content="Juliet's Bachelorette Party Itinerary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Background Animation */}
      <BackgroundAnimation />
      
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <AnimatePresence mode="wait">
          {step === 'verification1' && (
            <VerificationStep1 key="verification1" onVerify={handleVerificationStep1} />
          )}
          
          {step === 'verification2' && (
            <VerificationStep2 key="verification2" onVerify={handleVerificationStep2} />
          )}
          
          {step === 'welcome' && (
            <Welcome key="welcome" name={guestName} onContinue={handleWelcomeContinue} />
          )}
          
          {step === 'timeline' && (
            <motion.main 
              className="fixed inset-0 w-full h-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Timeline guestName={guestName} />
            </motion.main>
          )}
        </AnimatePresence>
      </div>
      
      {step !== 'timeline' && (
        <footer className="py-4 text-center text-sm text-gray-500 mt-auto bg-white/50 backdrop-blur-sm">
          <p>Juliet's Bachelorette Party 2025 • Made with ❤️</p>
        </footer>
      )}
    </div>
  );
}

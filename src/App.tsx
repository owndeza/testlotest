import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Envelope from './components/Envelope';
import Paper from './components/Paper';
import Petals from './components/Petals';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isStep1Success, setIsStep1Success] = useState(false);
  const [isStep2Success, setIsStep2Success] = useState(false);
  const [showNoButton, setShowNoButton] = useState(true);
  const [paperVisible, setPaperVisible] = useState(false);
  const [isFlyingAway, setIsFlyingAway] = useState(false);
  const [showPetals, setShowPetals] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setTimeout(() => {
      setPaperVisible(true);
    }, 600);
  };

  const handleStep1Yes = () => {
    setIsStep1Success(true);
    setShowPetals(true);
    
    // After some time, hide petals and move to step 2
    setTimeout(() => {
      setPaperVisible(false);
      setTimeout(() => {
        setStep(2);
        setShowNoButton(true);
        setPaperVisible(true);
      }, 800);
    }, 4000);
  };

  const handleStep2Yes = () => {
    setIsStep2Success(true);
    setPaperVisible(false);
    setTimeout(() => {
      setIsFlyingAway(true);
    }, 500);
  };

  const handleNo = () => {
    setShowNoButton(false);
  };

  return (
    <div className="min-h-screen bg-[#fff5f5] flex items-center justify-center overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-200 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-pink-100 blur-3xl" />
      </div>

      <AnimatePresence>
        {showPetals && <Petals />}
      </AnimatePresence>

      <div className="relative flex flex-col items-center -mt-24">
        <AnimatePresence>
          {!isFlyingAway && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0, y: -200 }}
              className="relative"
            >
              <Paper
                isVisible={paperVisible}
                text={step === 1 ? (isStep1Success ? "урап" : "любишь меня?") : "уверена?"}
                showNoButton={showNoButton}
                onYes={step === 1 ? handleStep1Yes : handleStep2Yes}
                onNo={handleNo}
                direction={step === 1 ? 'right' : 'left'}
              />
              
              <Envelope 
                isOpen={isOpen} 
                onClick={handleOpenEnvelope}
                isFlyingAway={isFlyingAway}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isFlyingAway && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-serif text-pink-600 italic">мамочка я люблю тебя</h1>
          </motion.div>
        )}
      </div>

      {/* Footer text */}
      <div className="fixed bottom-8 text-pink-300 text-sm font-medium tracking-widest uppercase">
        Interactive Love Letter
      </div>
    </div>
  );
}

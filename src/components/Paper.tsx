import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PaperProps {
  text: string;
  showNoButton: boolean;
  onYes: () => void;
  onNo: () => void;
  direction: 'right' | 'left';
  isVisible: boolean;
}

const Paper: React.FC<PaperProps> = ({ text, showNoButton, onYes, onNo, direction, isVisible }) => {
  const variants = {
    hidden: { 
      y: -40, 
      x: 0, 
      scale: 0.8, 
      opacity: 0,
      rotate: 0
    },
    visible: { 
      y: 200, 
      x: direction === 'right' ? 140 : -140, 
      scale: 1, 
      opacity: 1,
      rotate: direction === 'right' ? 5 : -5,
      transition: { type: 'spring', damping: 12, stiffness: 100 }
    },
    exit: {
      y: -40,
      x: 0,
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute z-0 w-56 p-6 bg-white shadow-2xl rounded-sm border border-gray-100 flex flex-col items-center justify-center text-center"
          style={{ transformOrigin: 'top center' }}
        >
          {/* Paper texture/lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 24px' }} />
          
          <h2 className="text-xl font-serif text-gray-800 mb-6 relative z-10">{text}</h2>
          
          <div className="flex gap-4 relative z-10">
            <button
              onClick={onYes}
              className="px-6 py-2 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-colors shadow-md active:scale-95"
            >
              Да
            </button>
            
            <AnimatePresence>
              {showNoButton && (
                <motion.button
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0, rotate: 45 }}
                  onClick={onNo}
                  className="px-6 py-2 bg-gray-200 text-gray-600 rounded-full font-bold hover:bg-gray-300 transition-colors shadow-sm active:scale-95"
                >
                  Нет
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Paper;

import React from 'react';
import { motion } from 'motion/react';

interface EnvelopeProps {
  isOpen: boolean;
  onClick: () => void;
  isFlyingAway: boolean;
}

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onClick, isFlyingAway }) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={!isOpen ? onClick : undefined}
      animate={isFlyingAway ? { x: 1000, y: -500, rotate: 45, opacity: 0 } : {}}
      transition={{ duration: 0.8, ease: "backIn" }}
    >
      {/* Envelope Body */}
      <div className="relative w-64 h-44 bg-pink-100 rounded-b-lg shadow-xl overflow-hidden border-2 border-pink-200">
        {/* Inside/Back of envelope */}
        <div className="absolute inset-0 bg-pink-50" />
        
        {/* Front flaps */}
        <div className="absolute inset-0 z-20">
          <svg viewBox="0 0 256 176" className="w-full h-full">
            <path d="M0 176 L128 88 L256 176 Z" fill="#fce7f3" stroke="#fbcfe8" strokeWidth="2" />
            <path d="M0 0 L128 88 L0 176 Z" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="2" />
            <path d="M256 0 L128 88 L256 176 Z" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="2" />
          </svg>
        </div>

        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <span className="bg-white/80 px-3 py-1 rounded-full text-pink-600 font-bold text-sm shadow-sm border border-pink-200">
              Открой меня!
            </span>
          </div>
        )}
      </div>

      {/* Top Flap */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-32 z-10 origin-top"
        initial={false}
        animate={{ rotateX: isOpen ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-pink-200 rounded-t-lg border-2 border-pink-300" style={{ backfaceVisibility: 'hidden' }}>
          <svg viewBox="0 0 256 128" className="w-full h-full">
            <path d="M0 0 L128 128 L256 0 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-pink-100 rounded-t-lg border-2 border-pink-200" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
          <svg viewBox="0 0 256 128" className="w-full h-full">
            <path d="M0 0 L128 128 L256 0 Z" fill="currentColor" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Envelope;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface PetalProps {
  id: number;
}

const Petal: React.FC<PetalProps> = ({ id }) => {
  const randomX = Math.random() * 100; // 0-100%
  const delay = Math.random() * 2;
  const duration = 3 + Math.random() * 4;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      initial={{ y: -20, x: `${randomX}vw`, opacity: 0, rotate: rotation }}
      animate={{ 
        y: '110vh', 
        opacity: [0, 1, 1, 0],
        rotate: rotation + 720,
        x: [`${randomX}vw`, `${randomX + (Math.random() * 20 - 10)}vw`]
      }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: "linear",
        repeat: 0
      }}
      className="fixed pointer-events-none z-50 text-pink-400"
    >
      <Heart size={20 + Math.random() * 20} fill="currentColor" />
    </motion.div>
  );
};

const Petals: React.FC = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 40 }, (_, i) => i);
    setPetals(newPetals);
  }, []);

  return (
    <>
      {petals.map((id) => (
        <Petal key={id} id={id} />
      ))}
    </>
  );
};

export default Petals;

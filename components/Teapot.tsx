'use client';

import { motion } from 'motion/react';

interface TeapotProps {
  offenseLevel: number; // 0 to 100
}

export function Teapot({ offenseLevel }: TeapotProps) {
  // Calculate colors and transforms based on offense level
  const isAngry = offenseLevel > 50;
  const isFurious = offenseLevel > 80;

  const bodyColor = isFurious ? '#ef4444' : isAngry ? '#f97316' : '#e5e7eb';
  const steamOpacity = offenseLevel / 100;
  
  // Shake animation if furious
  const shakeAnimation = isFurious 
    ? { x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0], transition: { repeat: Infinity, duration: 0.2 } }
    : isAngry
    ? { x: [-1, 1, -1, 1, 0], transition: { repeat: Infinity, duration: 0.5 } }
    : { x: 0, y: 0 };

  return (
    <motion.div 
      className="relative w-64 h-64 mx-auto"
      animate={shakeAnimation}
    >
      {/* Steam */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 flex justify-around items-end pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: steamOpacity }}
      >
        <motion.div 
          className="w-2 h-12 bg-gray-300 rounded-full blur-sm"
          animate={{ y: [-10, -30], opacity: [0, steamOpacity, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
        />
        <motion.div 
          className="w-3 h-16 bg-gray-300 rounded-full blur-sm"
          animate={{ y: [-10, -40], opacity: [0, steamOpacity, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
        />
        <motion.div 
          className="w-2 h-10 bg-gray-300 rounded-full blur-sm"
          animate={{ y: [-10, -25], opacity: [0, steamOpacity, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, delay: 1 }}
        />
      </motion.div>

      {/* Teapot SVG */}
      <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-xl" style={{ filter: `drop-shadow(0 10px 15px ${isFurious ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0,0,0,0.1)'})` }}>
        {/* Handle */}
        <path 
          d="M 40 70 C 10 70, 10 110, 40 110" 
          fill="none" 
          stroke={bodyColor} 
          strokeWidth="12" 
          strokeLinecap="round"
          style={{ transition: 'stroke 0.5s ease' }}
        />
        
        {/* Spout */}
        <path 
          d="M 150 90 Q 180 90, 180 50" 
          fill="none" 
          stroke={bodyColor} 
          strokeWidth="14" 
          strokeLinecap="round"
          style={{ transition: 'stroke 0.5s ease' }}
        />
        
        {/* Body */}
        <ellipse 
          cx="100" 
          cy="90" 
          rx="60" 
          ry="45" 
          fill={bodyColor} 
          style={{ transition: 'fill 0.5s ease' }}
        />
        
        {/* Lid */}
        <path 
          d="M 70 45 Q 100 30, 130 45 Z" 
          fill={isFurious ? '#b91c1c' : isAngry ? '#c2410c' : '#d1d5db'} 
          style={{ transition: 'fill 0.5s ease' }}
        />
        <circle 
          cx="100" 
          cy="35" 
          r="8" 
          fill={isFurious ? '#991b1b' : isAngry ? '#9a3412' : '#9ca3af'} 
          style={{ transition: 'fill 0.5s ease' }}
        />
        
        {/* Base */}
        <rect 
          x="70" 
          y="130" 
          width="60" 
          height="10" 
          rx="5" 
          fill={isFurious ? '#b91c1c' : isAngry ? '#c2410c' : '#d1d5db'} 
          style={{ transition: 'fill 0.5s ease' }}
        />

        {/* Face (Judgmental) */}
        <g transform="translate(100, 90)">
          {/* Eyes */}
          <motion.path 
            d={isFurious ? "M -25 -10 L -10 -5 M 25 -10 L 10 -5" : isAngry ? "M -25 -5 L -10 -5 M 25 -5 L 10 -5" : "M -20 -10 Q -15 -15 -10 -10 M 20 -10 Q 15 -15 10 -10"} 
            stroke="#1f2937" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round"
          />
          <circle cx="-15" cy="0" r="3" fill="#1f2937" />
          <circle cx="15" cy="0" r="3" fill="#1f2937" />
          
          {/* Mouth */}
          <motion.path 
            d={isFurious ? "M -10 15 Q 0 5 10 15" : isAngry ? "M -10 10 L 10 10" : "M -10 15 Q 0 20 10 15"} 
            stroke="#1f2937" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round"
          />
        </g>
      </svg>
    </motion.div>
  );
}

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics-based spring follow for museum fluid glide (Emil Kowalski guidelines)
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest('[data-cursor]');
      if (interactiveElement) {
        const text = interactiveElement.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else if (target.closest('button, a, input, textarea, [role="button"]')) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-besege-violet/40 bg-besege-violet/[0.04] backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (cursorText ? 100 : 48) : 24,
          height: isHovered ? (cursorText ? 100 : 48) : 24,
          borderColor: isHovered ? 'rgba(88, 78, 227, 0.8)' : 'rgba(88, 78, 227, 0.35)',
          backgroundColor: isHovered ? (cursorText ? 'rgba(88, 78, 227, 0.92)' : 'rgba(88, 78, 227, 0.08)') : 'rgba(88, 78, 227, 0.04)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-mono tracking-widest uppercase text-white font-semibold text-center px-2 select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny Center Dot (stays razor sharp) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-besege-violet"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHovered && cursorText ? 0 : 1,
          scale: isHovered ? 1.5 : 1,
        }}
      />
    </div>
  );
};

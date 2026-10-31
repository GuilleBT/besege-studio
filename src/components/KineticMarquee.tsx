import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

interface KineticMarqueeProps {
  text?: string;
  reverse?: boolean;
}

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  text = "FOR TODAY'S GODDESSES, MERMAIDS AND FAIRIES · BESEGÉ STUDIO · EL CUERPO COMO LIENZO VIVO · BÁRBARA SÁNCHEZ-GUERRERO · ",
  reverse = false,
}) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  return (
    <div className="relative py-6 overflow-hidden bg-besege-black text-white select-none border-y border-white/10">
      <motion.div
        style={{
          skewX: useTransform(smoothVelocity, [-1000, 1000], [-8, 8]),
        }}
        className="flex whitespace-nowrap will-change-transform"
      >
        <motion.div
          animate={{
            x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
          }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
          className="flex items-center text-xs sm:text-sm font-mono tracking-[0.25em] uppercase font-semibold text-white/90"
        >
          <span className="text-besege-violet mr-4">✦</span>
          <span>{text}</span>
          <span className="text-besege-gold mr-4 ml-4">✦</span>
          <span>{text}</span>
          <span className="text-besege-rose-neon mr-4 ml-4">✦</span>
          <span>{text}</span>
          <span className="text-besege-violet mr-4 ml-4">✦</span>
          <span>{text}</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* Built-in modules */
import { useState } from 'react';

/* Third-party modules */
import { motion, MotionConfig } from 'motion/react';

/* Components */
import { Button } from '@/components/ui/button';

const AnimatedHamburgerButton = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <Button
        render={
          <motion.button
            onClick={() => setIsActive((prevIsActive) => !prevIsActive)}
            initial={false}
            animate={isActive ? 'open' : 'closed'}
          >
            <motion.span
              style={{
                left: '50%',
                top: '35%',
                x: '-50%',
                y: '-50%',
              }}
              className='absolute h-0.5 w-5 bg-primary-foreground'
              variants={{
                open: {
                  rotate: ['0deg', '0deg', '45deg'],
                  top: ['35%', '50%', '50%'],
                },
                closed: {
                  rotate: ['45deg', '0deg', '0deg'],
                  top: ['50%', '50%', '35%'],
                },
              }}
            />
            <motion.span
              style={{
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
              }}
              className='absolute h-0.5 w-5 bg-primary-foreground'
              variants={{
                open: {
                  rotate: ['0deg', '0deg', '-45deg'],
                },
                closed: {
                  rotate: ['-45deg', '0deg', '0deg'],
                },
              }}
            />
            <motion.span
              style={{
                left: 'calc(50% + 5px)',
                bottom: '35%',
                x: '-50%',
                y: '50%',
              }}
              className='absolute h-0.5 w-2.5 bg-primary-foreground'
              variants={{
                open: {
                  rotate: ['0deg', '0deg', '45deg'],
                  left: '50%',
                  bottom: ['35%', '50%', '50%'],
                },
                closed: {
                  rotate: ['45deg', '0deg', '0deg'],
                  left: 'calc(50% + 5px)',
                  bottom: ['50%', '50%', '35%'],
                },
              }}
            />
          </motion.button>
        }
        className='relative size-10 rounded-full md:hidden'
      />
    </MotionConfig>
  );
};

export default AnimatedHamburgerButton;

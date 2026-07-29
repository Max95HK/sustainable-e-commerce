/* Third-party modules */
import { type LinkProps, createLink } from '@tanstack/react-router';
import type { VariantProps } from 'class-variance-authority';
import { motion } from 'motion/react';

/* Components */
import { buttonVariants } from '@/components/ui/button';

/* Utils */
import { cn } from '@/lib/utils';

const MotionLink = createLink(motion.a);

const DURATION = 0.25;
const STAGGER = 0.025;

type FlipButtonProps = {
  to: LinkProps['to'];
  children: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
};

const FlipLink = ({ to, children, variant = 'default' }: FlipButtonProps) => {
  return (
    <MotionLink
      to={to}
      className={cn(
        buttonVariants({ variant }),
        'relative block overflow-hidden whitespace-nowrap',
      )}
      initial='initial'
      whileHover='hovered'
    >
      <div>
        {children.split('').map((letter, index) => {
          return (
            <motion.span
              key={index}
              className='inline-block'
              variants={{
                initial: { y: 0 },
                hovered: { y: '-150%' },
              }}
              transition={{
                duration: DURATION,
                ease: 'easeInOut',
                delay: STAGGER * index,
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>

      <div className='absolute inset-0 flex justify-center items-center'>
        {children.split('').map((letter, index) => {
          return (
            <motion.span
              key={index}
              className='inline-block'
              variants={{
                initial: { y: '150%' },
                hovered: { y: 0 },
              }}
              transition={{
                duration: DURATION,
                ease: 'easeInOut',
                delay: STAGGER * index,
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>
    </MotionLink>
  );
};

export default FlipLink;

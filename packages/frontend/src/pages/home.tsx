/* Third-party modules */
import { Link } from '@tanstack/react-router';

/* Utils */
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* Components */
import AnimatedCopy from '@/components/custom/animated-copy';

/* Hooks */
import useSplitText from '@/hooks/use-split-text';
import { useRef } from 'react';

/* Assets */
import { forest } from '@/assets';
import { RiTreeFill } from 'react-icons/ri';
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { linesOpt } = useSplitText({
    targetSelector: '.spilt-text',
    containerRef: containerRef,
  });

  return (
    <AnimatedCopy>
      <section
        id='hero'
        className='container my-30 md:my-40 lg:my-60'
      >
        <div className='flex flex-col h-full space-y-4 lg:text-center lg:items-center'>
          <p className='spilt-text text-lg lg:text-xl text-muted-foreground font-semibold text-balance'>
            Traceable wood. Real impact
          </p>

          <h1 className='spilt-text h1 text-balance'>Wood that grows twice.</h1>

          <h2 className='spilt-text h4 text-balance'>
            Every order plants a real tree.
          </h2>

          <div className='flex gap-4 lg text-balance lg:self-center mt-8'>
            <Link
              to='/'
              className={cn(buttonVariants(), 'inline-flex items-center gap-3')}
            >
              Explore the catalog
              <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </section>

      <section
        id='mission'
        className='container bg-secondary rounded-lg pr-0 overflow-hidden h-screen'
      >
        <div className='grid grid-cols-12 h-full'>
          <div className='col-span-7 flex flex-col items-center justify-center space-y-4'>
            <p className='h4'>
              Every piece traced. Every order regrows something
            </p>
            <h2 className='flex items-center gap-4'>
              <span className='text-[12rem] font-semibold'>
                4382
              </span>
              <span className='text-2xl font-semibold'>Tree Planted</span>
            </h2>
            <Button
              variant='secondary'
              className='w-full max-w-sm inline-flex gap-3 items-center'
            >
              See your Forest
              <RiTreeFill />
            </Button>
          </div>
          <div className='col-span-5'>
            <img
              src={forest}
              alt=''
              className='object-cover size-full'
              loading='lazy'
            />
          </div>
        </div>
      </section>
    </AnimatedCopy>
  );
};

export default Home;

/* Third-party modules */
import { Link } from '@tanstack/react-router';

/* Utils */
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* Components */

/* Hooks */
import useSplitText from '@/hooks/use-split-text';
import { useRef } from 'react';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { linesOpt } = useSplitText({
    targetSelector: '.spilt-text',
    containerRef: containerRef,
  });

  return (
    <section
      id='hero'
      className='container mt-30 md:mt-40 lg:mt-60 h-[calc(100%-7.5rem)] md:h-[calc(100%-10rem)] lg:h-[calc(100%-15rem)]'
    >
      <div className='flex flex-col h-full lg:items-center'>
        <div
          ref={containerRef}
          className='flex flex-col space-y-4 lg:text-center'
        >
          <div>
            <p className='spilt-text text-lg lg:text-xl text-muted-foreground font-semibold text-balance'>
              Traceable wood. Real impact
            </p>
          </div>

          <div>
            <h1 className='spilt-text h1 text-balance'>
              Wood that grows twice.
            </h1>
          </div>

          <div>
            <h2 className='spilt-text h4 text-balance'>
              Furniture, objects, and toys made from certified or reclaimed
              wood. Every piece tells you where it came from. Every order plants
              a real tree.
            </h2>
          </div>

        </div>

        <div className='flex gap-4 lg text-balance lg:self-center mt-8'>
          <Link
            to='/'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Discover our mission
          </Link>
          <Link
            to='/'
            className={cn(buttonVariants())}
          >
            Explore the catalog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

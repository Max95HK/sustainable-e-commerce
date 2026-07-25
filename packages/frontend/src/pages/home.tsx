import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

const Home = () => {
  return (
    <section
      id='hero'
      className='container mt-30 md:mt-40 lg:mt-60 h-[calc(100%-7.5rem)] md:h-[calc(100%-10rem)] lg:h-[calc(100%-15rem)]'
    >
      <div className='flex h-full text-center'>
        <div className=' flex flex-col gap-4'>
          <h1 className='h1 flex flex-col'>
            <span className='text-lg lg:text-xl'>
              Traceable wood. Real impact
            </span>
            <span className=''>Wood that grows twice.</span>
          </h1>
          <h2 className='h4'>
            Furniture, objects, and toys made from certified or reclaimed wood.
            Every piece tells you where it came from. Every order plants a real
            tree.
          </h2>
          <div className=' flex gap-4 mx-auto mt-8'>
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
      </div>
    </section>
  );
};

export default Home;

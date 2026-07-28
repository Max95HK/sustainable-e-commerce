/* Third-party modules */
import { Link } from '@tanstack/react-router';

/* Components */

/* Utils */
import { buttonVariants } from '@/components/ui/button';

/* Custom modules */
import { cn } from '@/lib/utils';

/* Assets */
import { plant } from '@/assets';
import AnimatedHamburgerButton from '../custom/animated-hamburger-button';

const Header = () => {
  return (
    <header className='fixed top-4 left-0 w-full px-4 '>
      <div className='container h-16 flex items-center border-2 border-foreground rounded-lg justify-between bg-background/30 backdrop-blur-xs'>
        <div className='text-3xl flex items-center gap-2 md:gap-4'>
          <Link
            to='/'
            className='font-semibold font-satisfy'
          >
            Maxylvan
          </Link>
          <img
            src={plant}
            alt='A plant icon'
            width={25}
            height={25}
          />
        </div>
        <div className='hidden md:flex items-center gap-3'>
          <Link
            to='/login'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Login
          </Link>
          <Link
            to='/signup'
            className={cn(buttonVariants())}
          >
            Start for free
          </Link>
        </div>

        {/* <div className='md:hidden'>
          <DropdownMenu >
            <DropdownMenuTrigger render={<Button variant='outline' />}>
              <ImMenu size={22} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className='hover:font-semibold transition-[font-weight] duration-150 text-lg'
                  render={<Link to='/login' />}
                >
                  Log In
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='hover:font-semibold transition-[font-weight] duration-150 text-lg'
                  render={<Link to='/signup' />}
                >
                  Sign Up
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}

        <AnimatedHamburgerButton /> 

      </div>
    </header>
  );
};

export default Header;

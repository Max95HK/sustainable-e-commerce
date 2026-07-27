/* Built-in modules */
import { useRef, type ReactNode } from 'react';

/* Third-party modules */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

/* Utils */
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, SplitText);

type CopyProps = {
  children: ReactNode;
  className?: string;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  stagger?: number;
  duration?: number;
  isCopyWrapper?: boolean;
};

const OldCopy = ({
  children,
  className,
  animateOnScroll = true,
  delay = 0,
  blockColor = 'var(--primary)',
  stagger = 0.15,
  duration = 0.75,
  isCopyWrapper = true,
  
}: CopyProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitTextRefs = useRef<SplitText[]>([]);
  const lines = useRef<Element[]>([]);
  const blocks = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitTextRefs.current = [];
      lines.current = [];
      blocks.current = [];

      const textElements = containerRef.current?.hasAttribute(
        'data-copy-wrapper',
      )
        ? (Array.from(containerRef.current.children) as HTMLElement[])
        : [containerRef.current];

      textElements.forEach((textElement) => {
        const spitText = SplitText.create(textElement, {
          type: 'lines',
          linesClass: 'block-line++',
        });

        splitTextRefs.current.push(spitText);

        spitText.lines.forEach((line) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'block-line-wrapper';
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);

          const block = document.createElement('div');
          block.className = 'block-revealer';
          block.style.backgroundColor = blockColor;
          wrapper.appendChild(block);

          lines.current.push(line);
          blocks.current.push(block);
        });
      });

      gsap.set(lines.current, { opacity: 0 });
      gsap.set(blocks.current, {
        opacity: 1,
        scaleX: 0,
        transformOrigin: 'left center',
      });

      const createBLockRevealAnimation = (
        block: HTMLDivElement,
        line: Element,
        index: number,
      ) => {
        const timeline = gsap.timeline({ delay: delay + index * stagger });

        timeline.to(block, { scaleX: 1, duration, ease: 'power4.inOut' });
        timeline.set(line, { opacity: 1 });
        timeline.set(block, { transformOrigin: 'right center' });
        timeline.to(block, { scaleX: 0, duration, ease: 'power4.inOut' });

        return timeline;
      };

      if (animateOnScroll) {
        blocks.current.forEach((block, index) => {
          const timeline = createBLockRevealAnimation(
            block,
            lines.current[index],
            index,
          );

          timeline.pause();

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 90%',
            once: true,
            onEnter: () => timeline.play(),
          });
        });
      } else {
        blocks.current.forEach((block, index) => {
          createBLockRevealAnimation(block, lines.current[index], index);
        });
      }

      return () => {
        splitTextRefs.current.forEach((spiltText) => spiltText.revert());

        const wrappers = containerRef.current?.querySelectorAll(
          '.block-line-wrapper',
        );

        wrappers?.forEach((wrapper) => {
          if (wrapper.parentNode && wrapper.firstChild) {
            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
            wrapper.remove();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, blockColor, stagger, duration],
    },
  );

  return (
    <div
      ref={containerRef}
      data-copy-wrapper={isCopyWrapper ? 'true' : undefined}
      className={cn(className)}
    >
      {children}
    </div>
  );
};

export default OldCopy;

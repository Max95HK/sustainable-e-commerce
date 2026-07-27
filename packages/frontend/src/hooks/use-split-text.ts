/* Built-in modules */
import { useRef, useState, type RefObject } from 'react';

/* Third-party modules */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

type UseSplitText<T extends HTMLElement> = {
  targetSelector: string;
  containerRef: RefObject<T | null>;
};

type LineOpt = {
  [parentAttr: string]: string[];
};

const useSplitText = <T extends HTMLElement>({
  targetSelector,
  containerRef,
}: UseSplitText<T>) => {
  const [linesOpt, setLinesOpt] = useState<LineOpt>({});

  const isMounted = useRef(false);
  const splitRef = useRef<SplitText | null>(null);

  console.log(linesOpt);

  useGSAP(
    () => {
      isMounted.current = true;

      if (!containerRef.current) return;

      const children = Array.from(
        containerRef.current.querySelectorAll(targetSelector),
      );

      children.forEach((child, index) => {
        child.setAttribute('data-parent', String(index));
      });

      document.fonts.ready.then(() => {
        if (isMounted.current) {
          SplitText.create(targetSelector, {
            type: 'lines',
            autoSplit: true,
            linesClass: 'line++',
            aria: 'none',
            onSplit: (self) => {
              const lineOpt = self.lines.reduce((acc, line) => {
                if (!line.parentElement) return acc;
                const parentAttr =
                  line.parentElement.getAttribute('data-parent');
                if (!parentAttr) return acc;
                const prevLineOpt = acc[parentAttr] ?? [];

                acc[parentAttr] = [...prevLineOpt, line.textContent ?? ''];

                return acc;
              }, {} as LineOpt);

              setLinesOpt(lineOpt);
              splitRef.current = self;
            },
          });
        }
      });

      return () => {
        isMounted.current = false;
        splitRef.current?.revert();
      };
    },
    { scope: containerRef },
  );

  return { linesOpt };
};

export default useSplitText;

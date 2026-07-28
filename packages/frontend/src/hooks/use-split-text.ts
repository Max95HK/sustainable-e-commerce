/* Built-in modules */
import { useRef, useState, type RefObject } from 'react';

/* Third-party modules */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const SPLIT_TARGET_ATTR = 'data-split-group'

type UseSplitTextParams<T extends HTMLElement> = {
  targetSelector: string;
  containerRef: RefObject<T | null>;
};

const useSplitText = <T extends HTMLElement>({
  targetSelector,
  containerRef,
}: UseSplitTextParams<T>) => {
  const [lineGroups, setLineGroups] = useState<string[][]>([]);

  const isMounted = useRef(false);
  const splitRef = useRef<SplitText | null>(null);

  console.log(lineGroups);

  useGSAP(
    () => {
      isMounted.current = true;

      if (!containerRef.current) return;

      const splitTatgets = Array.from(
        containerRef.current.querySelectorAll(targetSelector),
      );

      splitTatgets.forEach((splitTarget) => {
        splitTarget.setAttribute(SPLIT_TARGET_ATTR, crypto.randomUUID());
      });

      document.fonts.ready.then(() => {
        if (isMounted.current) {
          SplitText.create(targetSelector, {
            type: 'lines',
            autoSplit: true,
            linesClass: 'line++',
            aria: 'none',
            onSplit: (self) => {
              const linesMap = new Map<string, string[]>();

              self.lines.forEach((line) => {
                if (!line.parentElement) return;
                const parentAttr =
                  line.parentElement.getAttribute(SPLIT_TARGET_ATTR);
                if (!parentAttr) return;
                const prevLines = linesMap.get(parentAttr) ?? [];

                linesMap.set(parentAttr, [
                  ...prevLines,
                  line.textContent ?? '',
                ]);
              });

              const orderedGroups = splitTatgets.map((splitTarget) => {
                const parentAttr = splitTarget.getAttribute(SPLIT_TARGET_ATTR);
                if (!parentAttr) return [];
                return linesMap.get(parentAttr) ?? [];
              });

              setLineGroups(orderedGroups);

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

  return { lineGroups };
};

export default useSplitText;

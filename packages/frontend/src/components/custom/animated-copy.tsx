/* Built-in modules */
import type { ReactNode } from "react";

type AnimatedCopyProps = {
  children: ReactNode
}

const AnimatedCopy = ({children}: AnimatedCopyProps) => {
  return (
    <div className="">{children}</div>
  );
};

export default AnimatedCopy;
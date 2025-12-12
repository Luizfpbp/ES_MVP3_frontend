import React from "react";
import { cn } from "../../utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border flex flex-col justify-center items-center rounded-xl border-transparent bg-white shadow gap-2 p-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default Card;

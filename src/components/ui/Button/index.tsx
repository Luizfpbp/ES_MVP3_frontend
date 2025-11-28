import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants";
import { cn } from "../../utils";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  color?: "primary" | "success";
  disabled?: boolean;
  label?: string;
  iconPosition?: "left" | "right";
  icon?: React.ReactNode;
  route?: string;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, disabled, ...props }, ref) => {
    const customClass = cn(
      buttonVariants({ variant, color, size, disabled, className })
    );
    return <button className={customClass} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export default Button;

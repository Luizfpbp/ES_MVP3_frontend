import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-[#EDE2D4] text-[#5C3B23] hover:bg-secondary/80",
        destructive:
          "border-transparent bg-[#DC2828] text-[#FBFAF9] hover:bg-destructive/80",
        outline: "text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

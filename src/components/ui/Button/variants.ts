import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "outline-none w-fit text-center appearance-none rounded-lg font-normal text-nowrap hover:opacity-90 hover:shadow-elegant",
  {
    variants: {
      variant: {
        contained: "border text-white",
        outlined: "border bg-transparent",
        text: "bg-transparent",
      },
      color: {
        primary: "#213F93",
        success: "#99C32C",
      },
      size: {
        small: "px-[10.5px] py-3 text-sm",
        medium: "px-3 text-base h-[40px]",
        large: "px-8 py-2 text-lg",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        disabled: false,
        className: "border-[#213F93] bg-[#815331] hover:bg-accent-[#815331]",
      },
      {
        variant: "contained",
        color: "success",
        disabled: false,
        className: "border-[#99C32C] bg-[#D7A542] hover:accent-current",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      disabled: false,
      size: "medium",
    },
  }
);

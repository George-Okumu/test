import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";

// forwardref expose a child components DOM to a parent component with a ref

// Utility function for class names (replacing `cn` from Next.js setups)
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-[#3ea182] text-white hover:bg-blue-600 hover:bg-gray-400",
        secondary: "bg-blue-500 text-white hover:bg-gray-400",
        ghost: "bg-[#000209] text-white hover:bg-gray-400",
        outline: "border border-[#000209] hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Component = asChild ? "span" : "button";

  return (
    <Component
      className={classNames(
        buttonVariants({ variant, size }),
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export { Button, buttonVariants };

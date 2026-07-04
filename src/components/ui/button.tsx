import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg shadow-[#667eea]/30 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 hover:scale-[1.02]",
        secondary:
          "bg-gradient-to-r from-[#1dd1a1] to-[#10ac84] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02]",
        ghost:
          "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20",
        outline:
          "border-2 border-[#667eea]/50 text-white bg-transparent hover:bg-[#667eea]/10 hover:border-[#667eea]",
        destructive:
          "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a24] text-white shadow-lg",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

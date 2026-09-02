import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className, ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", className)} {...rest}>
      {children}
    </div>
  );
}

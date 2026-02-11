import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "page" | "wide";
}

const SIZE_CLASS: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-content",
  page: "max-w-page",
  wide: "max-w-[88rem]",
};

export default function Container({
  children,
  className,
  size = "page",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", SIZE_CLASS[size], className)}>
      {children}
    </div>
  );
}

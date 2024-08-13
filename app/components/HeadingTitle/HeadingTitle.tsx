import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface HeadingTitleProps {
  text: string;
  Icon?: ReactNode;
  className?: string;
}

const Title: React.FC<HeadingTitleProps> = ({ text, Icon, className }) => {
  return (
    <h2
      className={cn(
        "text-[1.8rem] font-bold flex gap-[0.8rem] items-center leading-tight",
        className
      )}
    >
      {Icon}
      {text}
    </h2>
  );
};

export default Title;

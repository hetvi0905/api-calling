import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface HeadingTitleProps {
  text: string;
  Icon?: ReactNode;
  className?: string;
}

const Title: React.FC<HeadingTitleProps> = ({ text, Icon, className }) => {
  return (
    <h2 className={cn("font-bold flex leading-tight", className)}>
      {Icon}
      {text}
    </h2>
  );
};

export default Title;

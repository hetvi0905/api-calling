import React, { ReactNode } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const HorizontalScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollArea className="w-[100svw] md:w-calc-100svw-minus-360px overflow-hidden whitespace-nowrap">
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default HorizontalScroll;

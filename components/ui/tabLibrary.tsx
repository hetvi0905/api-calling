'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const TabsV2 = TabsPrimitive.Root;

const TabsListV2 = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center bg-white text-muted-foreground',
      className
    )}
    {...props}
  />
));
TabsListV2.displayName = TabsPrimitive.List.displayName;

const TabsTriggerV2 = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background transition-all bg-white  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-b border-grey40 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
));
TabsTriggerV2.displayName = TabsPrimitive.Trigger.displayName;

const TabsContentV2 = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('', className)} {...props} />
));
TabsContentV2.displayName = TabsPrimitive.Content.displayName;

export { TabsV2, TabsListV2, TabsTriggerV2, TabsContentV2 };

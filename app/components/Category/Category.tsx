"use client";

import React from "react";
import Image from "next/image";
import Title from "../HeadingTitle/HeadingTitle";
import PdfIcon from "@/app/svgs/PdfIcon";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import AudioIcon from "@/app/svgs/AudioIcon";
import MediaIcon from "@/app/svgs/MediaIcon";
import VideoIcon from "@/app/svgs/VideoIcon";
import AudioOverlay from "@/app/svgs/AudioOverlay";
import ImageOverlay from "@/app/svgs/ImageOverlay";
import VideoOverlay from "@/app/svgs/VideoOverlay";
import PdfOverlay from "@/app/svgs/PdfOverlay";
import CurrencyIcon from "@/app/svgs/CurrencyIcon";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  isPaid: boolean;
  price: string | null;
  contentType: string;
  viewCount: number;
  createdAt: string;
}

export interface CategoryProps {
  content: ContentItem;
  className?: string;
  id?: string;
}

const iconComponents: { [key: string]: React.FC } = {
  document: PdfIcon,
  audio: AudioIcon,
  images: MediaIcon,
  video: VideoIcon,
};

const overlayIconsObj: { [key: string]: React.FC } = {
  document: PdfOverlay,
  audio: AudioOverlay,
  images: ImageOverlay,
  video: VideoOverlay,
};

export interface SkeletonProp {
  count?: number;
}

export const CategoryCardSkeleton = ({ count }: SkeletonProp) => {
  return (
    <>
      {Array(count || 1)
        .fill("")
        .map((_, i) => (
          <div key={i} className="flex flex-col w-full">
            <AspectRatio ratio={1.63 / 1}>
              <Skeleton className="h-full  w-full" />
            </AspectRatio>
            <div className="space-y-3 m-3 pb-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[130px]" />
            </div>
          </div>
        ))}
    </>
  );
};

const Category: React.FC<CategoryProps> = ({ id, className, content }) => {
  const IconComponent = iconComponents[content.contentType ?? ""];
  const OverlayIcon = overlayIconsObj[content?.contentType ?? ""];

  return (
    <figure
      key={content.id}
      id={id}
      className={cn(" w-[130px]  overflow-hidden", className)}
    >
      <div className="relative">
        {content.thumbnail && (
          <Image
            src={`${process.env.NEXT_PUBLIC_CDN}/${content.thumbnail}`}
            alt={content.title}
            className="w-full object-cover rounded-[8px] h-full"
            width={130}
            height={130}
          />
        )}
        <div className=" top-0 bottom-0 left-0 right-0 absolute flex justify-center items-center content-overlay">
          {OverlayIcon && <OverlayIcon />}
        </div>
      </div>
      <figcaption className="mt-[8px] ml-[8px]">
        <h2 className="text-grey100 text-[14px] truncate font-bold leading-tight mb-[4px]">
          {content.title}
        </h2>
        <div className="flex justify-between">
          <p className="text-[#6E7375] text-[14px] font-normal">
            {content.viewCount} views
          </p>
          <div>{IconComponent && <IconComponent />}</div>
        </div>
      </figcaption>
    </figure>
  );
};

export default Category;

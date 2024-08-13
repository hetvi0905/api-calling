import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import VideoIcon from "@/app/svgs/VideoIcon";
import AudioIcon from "@/app/svgs/AudioIcon";
import PdfIcon from "@/app/svgs/PdfIcon";
import MediaIcon from "@/app/svgs/MediaIcon";
import { Skeleton } from "@/components/ui/skeleton";
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

export interface SingleVideoProps {
  className?: string;
  id?: string;
  content: ContentItem;
}

const iconComponents: { [key: string]: React.FC } = {
  document: PdfIcon,
  audio: AudioIcon,
  images: MediaIcon,
  video: VideoIcon,
};

export interface SkeletonProp {
  count?: number;
}

export const SingleVidCardSkeleton = ({ count }: SkeletonProp) => {
  return (
    <>
      {Array(count || 1)
        .fill("")
        .map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 w-full">
            <AspectRatio ratio={1.63 / 1}>
              <Skeleton className="h-full  w-full" />
            </AspectRatio>
            <div className="space-y-3 m-3 pb-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        ))}
    </>
  );
};

const SingleVideocard: React.FC<SingleVideoProps> = ({
  id,
  className,
  content,
}) => {
  const IconComponent = iconComponents[content.contentType ?? ""];

  return (
    <figure
      key={content.id}
      id={id}
      className={cn(
        "bg-white w-[148px] rounded-[8px] overflow-hidden custom-box-shadow",
        className
      )}
    >
      <div className="relative">
        <AspectRatio ratio={1.63 / 1}>
          {content.thumbnail && (
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN}/${content.thumbnail}`}
              alt={content.title}
              className="w-full object-cover h-full"
              width={148}
              height={148}
            />
          )}
        </AspectRatio>
      </div>
      <figcaption className="mt-[8px] ml-[8px]">
        <h2 className="text-grey100 text-[14rpx] truncate font-bold leading-tight mb-[4px]">
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

export default SingleVideocard;

import React from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import VideoIcon from "@/app/svgs/VideoIcon";
import AudioIcon from "@/app/svgs/AudioIcon";
import PdfIcon from "@/app/svgs/PdfIcon";
import MediaIcon from "@/app/svgs/MediaIcon";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  isPaid: boolean;
  price: string | null;
  contentType: string;
  likeCount: number;
  createdAt: string;
}

export interface SingleVideoProps {
  className?: string;
  id?: string;
  content: ContentItem;
  entityId: string; // Add this prop to receive entityId
}

const iconComponents: { [key: string]: React.FC } = {
  document: PdfIcon,
  audio: AudioIcon,
  images: MediaIcon,
  video: VideoIcon,
};

export const CardSkeleton = ({ count }: { count?: number }) => {
  return (
    <>
      {Array(count)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="flex w-full flex-col overflow-hidden items-center"
          >
            <div className="rounded-full w-full overflow-hidden">
              <AspectRatio ratio={1 / 1}>
                <Skeleton className="w-full h-full" />
              </AspectRatio>
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="mt-[8px] w-[9rem] h-[1.6rem] mb-[4px]" />
              <Skeleton className="w-[7rem] h-[1.4rem]" />
            </div>
          </div>
        ))}
    </>
  );
};

const Card: React.FC<SingleVideoProps> = ({
  id,
  className,
  content,
  entityId,
}) => {
  const IconComponent = iconComponents[content.contentType ?? ""];

  return (
    <Link href={`/${entityId}/library/tag/${content.id}`} passHref>
      <figure key={content.id} id={id} className={`w-[80px] ${className}`}>
        <div className="rounded-full overflow-hidden w-full h-[80px]">
          <AspectRatio ratio={1 / 1} className="w-full h-full">
            {content?.thumbnail && (
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN}/${content?.thumbnail}`}
                alt={content?.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full rounded-full"
              />
            )}
          </AspectRatio>
        </div>
        <figcaption className="mt-[8px] leading-4">
          <h2 className="text-grey100 text-[14px] truncate font-bold">
            {content.title}
          </h2>
          <div className="text-center">
            <p className="text-[#6E7375] text-[14px] font-normal">
              {content.likeCount} views
            </p>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Card;

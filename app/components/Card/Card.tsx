import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import VideoIcon from "@/app/svgs/VideoIcon";
import AudioIcon from "@/app/svgs/AudioIcon";
import PdfIcon from "@/app/svgs/PdfIcon";
import MediaIcon from "@/app/svgs/MediaIcon";

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
}

const iconComponents: { [key: string]: React.FC } = {
  document: PdfIcon,
  audio: AudioIcon,
  images: MediaIcon,
  video: VideoIcon,
};

const Card: React.FC<SingleVideoProps> = ({ id, className, content }) => {
  const IconComponent = iconComponents[content.contentType ?? ""];

  return (
    <figure key={content.id} id={id} className={`w-[80px] ${className}`}>
      <div className="rounded-full overflow-hidden w-full h-[80px]">
        <AspectRatio ratio={1 / 1} className="w-full h-full">
          {content?.thumbnail && (
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN}/${content?.thumbnail}`}
              alt={content?.title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          )}
        </AspectRatio>
      </div>
      <figcaption className="mt-[8px]  leading-4">
        <h2 className="text-grey100 text-[14px] truncate font-bold">
          {content.title}
        </h2>

        <div className=" text-center">
          <p className="text-[#6E7375] text-[14px] font-normal">
            {content.likeCount} views
          </p>
        </div>
      </figcaption>
    </figure>
  );
};

export default Card;

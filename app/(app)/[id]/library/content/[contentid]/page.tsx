"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import AudioPlayer from "@/app/components/AudioPlayer/AudioPlayer";
import VideoPlayer from "@/app/components/VideoPlayer/VideoPlayer";
import Title from "@/app/components/HeadingTitle/HeadingTitle";

interface ContentData {
  contentType: string;
  contentUrl: string;
  name?: string;
  thumbnail: string;
  title: string;
}

interface ApiResponse {
  status: number;
  data: {
    message: string;
    content: ContentData;
  };
}

const Content = () => {
  const { id: entityId, contentid } = useParams<{
    id: string;
    contentid: string;
  }>();
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://devapi.cohort.social/library/organization/${entityId}/content/details/${contentid}`
        );
        const data: ApiResponse = await response.json();
        setContentData(data.data.content);
      } catch (error) {
        console.error("Error fetching content data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [entityId, contentid]);

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <div className="w-full md:w-[600px]">
      {contentData?.contentType === "images" && contentData.contentUrl && (
        <Image
          src={`${process.env.NEXT_PUBLIC_CDN}/${contentData?.contentUrl}`}
          alt={contentData.name || "Image content"}
          width={600}
          height={400}
          className="object-contain"
        />
      )}
      {contentData?.contentType === "audio" && contentData.contentUrl && (
        <AudioPlayer
          thumbnail={contentData?.thumbnail ?? ""}
          contentUrl={contentData?.contentUrl ?? ""}
        />
      )}
      {contentData?.contentType === "video" && contentData.contentUrl && (
        <VideoPlayer contentUrl={contentData?.contentUrl ?? ""} />
      )}

      <Title text={contentData?.title ?? ""} />
    </div>
  );
};

export default Content;

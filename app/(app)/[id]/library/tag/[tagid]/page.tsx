"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  TabsContentV2,
  TabsListV2,
  TabsTriggerV2,
  TabsV2,
} from "@/components/ui/tabLibrary";
import HorizontalScroll from "@/app/components/Scrolls/HorizontalScroll";
import { useTabParams } from "@/app/hooks/useTabParams";
import Title from "@/app/components/HeadingTitle/HeadingTitle";
import { AspectRatio } from "@/components/ui/aspect-ratio";
interface ContentData {
  contentType: string;
  contentUrl: string;
  name?: string;
  thumbnail: string;
}

interface ApiResponse {
  status: number;
  data: {
    message: string;
    content: ContentData;
    info: {
      id: string;
      title: string;
      thumbnail: string;
      users: {
        user: string;
        image: string;
      }[];
      likeCount: number;
    };
    count: {
      video: number;
      audio: number;
      images: number;
      document: number;
    };
    isUserLiked: boolean;
  };
}

const tabsArr = [
  { name: "playlist", value: "Playlist" },
  { name: "video", value: "Videos" },
  { name: "audio", value: "Audios" },
  { name: "document", value: "PDF" },
  { name: "images", value: "Images" },
];

const Page = () => {
  const { id: entityId, tagid } = useParams<{
    id: string;
    contentid: string;
    tagid: string;
  }>();

  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleTabs, defaultValue, curTab } = useTabParams(tabsArr, "tabs");

  const [tagInfo, setTagInfo] = useState<{
    title: string;
    thumbnail: string;
    users: { user: string; image: string }[];
    likeCount: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://devapi.cohort.social/library/organization/${entityId}/tags/${tagid}/info`
        );
        const data: ApiResponse = await response.json();
        setContentData(data.data.content);
        setTagInfo(data.data.info);
      } catch (error) {
        console.error("Error fetching content data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [entityId, tagid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full px-[16px]">
        {/* {tagInfo && (
          <div className="my-[24px] w-[180px]">
            <div className="relative ml-[30px] w-[180px] h-[180px] rounded-[8px] overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN}/${tagInfo.thumbnail}`}
                alt={tagInfo.title}
                width={180}
                height={360}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-left mt-2 ml-[10px]">
              <Title text={tagInfo.title} />
            </div>
          </div>
        )} */}
        <div className=" mx-auto my-[10px] w-[180px] h-[180px]">
          <div className="relative rounded-[8px] h-full overflow-hidden">
            {tagInfo && (
              <Image
                alt="user"
                src={`${process.env.NEXT_PUBLIC_CDN}/${tagInfo?.thumbnail}`}
                className="w-full h-full object-cover aspect-video"
                width={360}
                height={180}
              />
            )}
          </div>
        </div>
        {tagInfo && (
          <div className="">
            <Title text={tagInfo?.title} />
          </div>
        )}
        <TabsV2
          defaultValue={defaultValue}
          className="bg-white border-b border-greqy40 w-full"
        >
          <TabsListV2 className="sticky z-50 bg-white top-[-2px]">
            <HorizontalScroll>
              {tabsArr.map((tab, i) => (
                <TabsTriggerV2
                  key={i}
                  id={tab.name}
                  value={tab.name}
                  onClick={handleTabs}
                  className="text-[1.4rem] h-[4.6rem] w-[8.4rem] text-center"
                >
                  {tab.value}
                </TabsTriggerV2>
              ))}
            </HorizontalScroll>
          </TabsListV2>

          <TabsContentV2 value="playlist">
            <div className="p-[1.6rem] flex flex-col gap-[1.6rem]"></div>
          </TabsContentV2>

          <TabsContentV2 value={"video"}>
            <div className="p-[1.6rem] grid grid-cols-2 gap-[1.6rem]"></div>
          </TabsContentV2>

          <TabsContentV2 value="audio">
            <div className="p-[1.6rem] grid grid-cols-2 gap-[1.6rem]"></div>
          </TabsContentV2>

          <TabsContentV2 value="document">
            <div className="p-[1.6rem] grid grid-cols-2 gap-[1.6rem]"></div>
          </TabsContentV2>

          <TabsContentV2 value="images">
            <div className="p-[1.6rem] grid grid-cols-2 gap-[1.6rem]"></div>
          </TabsContentV2>
        </TabsV2>
      </div>
    </>
  );
};

export default Page;

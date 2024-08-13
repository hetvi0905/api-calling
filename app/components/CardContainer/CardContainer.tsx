import React from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import HorizontalScroll from "../Scrolls/HorizontalScroll";
import SingleVideocard from "../SingleVideocard/SingleVideocard";
import { ContentItem } from "@/lib/store/slices/libraryapi";
import Title from "../HeadingTitle/HeadingTitle";
interface CardContainerProps {
  title?: string;
  contentData?: ContentItem[];
  isLoading?: boolean;
  cardWidth?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
  title,
  contentData,
  cardWidth,
  isLoading,
}) => {
  return (
    <>
      {title && (
        <div className="text-[1.8rem] ml-5 font-bold">
          <Title text={title} />
        </div>
      )}

      <div className="max-w-screen-lg">
        <HorizontalScroll>
          {isLoading ? (
            <div className="flex m-[1rem] gap-[1.6rem]">
              <div className="flex flex-col space-y-3 w-[14.8rem]">
                <AspectRatio ratio={1.63 / 1}>
                  <Skeleton className="h-full  w-full" />
                </AspectRatio>
                <div className="space-y-3 m-3 pb-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3 w-[14.8rem]">
                <AspectRatio ratio={1.63 / 1}>
                  <Skeleton className="h-full  w-full" />
                </AspectRatio>
                <div className="space-y-3 m-3 pb-3">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3 w-[14.8rem]">
                <AspectRatio ratio={1.63 / 1}>
                  <Skeleton className="h-full  w-full" />
                </AspectRatio>
                <div className="space-y-3 m-3 pb-3">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full gap-[1.6rem] p-[1rem]">
              {!isLoading && contentData?.[0] ? (
                contentData?.map((content, i) => (
                  // <AspectRatio ratio={1 / 1}>
                  <SingleVideocard key={i} content={content} />
                  // </AspectRatio>
                ))
              ) : (
                <span className="text-[1.4rem] w-full text-center py-[1.5rem]">
                  No data found!
                </span>
              )}
            </div>
          )}
        </HorizontalScroll>
      </div>
    </>
  );
};

export default CardContainer;

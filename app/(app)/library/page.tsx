"use client";
import React, { useEffect, useState } from "react";
import HorizontalScroll from "@/app/components/Scrolls/HorizontalScroll";
import SingleVideocard from "@/app/components/SingleVideocard/SingleVideocard";
import Title from "@/app/components/HeadingTitle/HeadingTitle";
import Card, { CardSkeleton } from "@/app/components/Card/Card";
import Category, {
  CategoryCardSkeleton,
} from "@/app/components/Category/Category";
import { useParams } from "next/navigation";
import { SingleVidCardSkeleton } from "@/app/components/SingleVideocard/SingleVideocard";
interface TagContentItem {
  id: string;
  title: string;
  thumbnail: string;
  likeCount: number;
}

interface CategoryContent {
  id: string;
  type: string;
  price: string | null;
  title: string;
  isPaid: boolean;
  thumbnail: string;
  likeCount: number | null;
  viewCount: number;
  contentType: string | null;
  createdAt: string;
}

interface CategoryResponseItem {
  id: string;
  title: string;
  visibility: string;
  categoryContent: CategoryContent[];
}

interface ContentItem {
  id: string;
  title: string;
  tagContent: TagContentItem[]; // The tagContent exists here
  createdAt: string;
}

const Page: React.FC = () => {
  const params = useParams<{ id: string }>();

  const [latestContent, setLatestContent] = useState<ContentItem[]>([]);
  const [popularContent, setPopularContent] = useState<ContentItem[]>([]);
  const [categoryContentData, setCategoryContentData] = useState<
    CategoryResponseItem[]
  >([]);
  const [guruContentData, setGuruContentData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestContent = async () => {
    try {
      const response = await fetch(
        `https://devapi.cohort.social/library/philosophy/684ee90a-6498-4c58-a425-bdbe93886eb7/content/latest`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch latest content");
      }
      const result = await response.json();
      setLatestContent(result.data.content);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryContent = async () => {
    try {
      const response = await fetch(
        `https://devapi.cohort.social/library/philosophy/684ee90a-6498-4c58-a425-bdbe93886eb7/content/category`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category content");
      }
      const result = await response.json();
      setCategoryContentData(result.data.content);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGuruContent = async () => {
    try {
      const response = await fetch(
        `https://devapi.cohort.social/library/philosophy/684ee90a-6498-4c58-a425-bdbe93886eb7/content/category`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      const result = await response.json();
      setGuruContentData(result.data.content);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularContent = async () => {
    try {
      const response = await fetch(
        `https://devapi.cohort.social/library/philosophy/684ee90a-6498-4c58-a425-bdbe93886eb7/content/populer`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch popular content");
      }
      const result = await response.json();
      setPopularContent(result.data.content);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestContent();
    fetchGuruContent();
    fetchCategoryContent();
    fetchPopularContent();
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex flex-row gap-[10px] ml-[13px] mt-3">
          <SingleVidCardSkeleton count={5} />
        </div>
        <div className="flex flex-row gap-[10px] ml-[13px]">
          <CategoryCardSkeleton count={5} />
        </div>
        <div className="flex flex-row gap-[10px] ml-[13px]">
          <CategoryCardSkeleton count={5} />
        </div>
        <div className="flex flex-row gap-[10px] ml-[13px]">
          <CategoryCardSkeleton count={5} />
        </div>
        <div className="flex flex-row gap-[10px] ml-[13px]">
          <CategoryCardSkeleton count={5} />
        </div>
        <div className="flex flex-row gap-[10px] ml-[13px] mt-3">
          <CardSkeleton count={5} />
        </div>
        <div className="flex flex-row gap-[10px] ml-[13px]">
          <CardSkeleton count={5} />
        </div>
        <div className="flex flex-row gap-[10px] ml-[13px] mt-3">
          <SingleVidCardSkeleton count={5} />
        </div>
      </>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto px-[16px] overflow-hidden">
      <Title text="Latest from Organisation" className="text-[18px] pt-4" />
      <HorizontalScroll>
        <div className="flex flex-row gap-4 pt-[9px]">
          {latestContent.map((item) => (
            <SingleVideocard key={item.id} content={item} />
          ))}
        </div>
      </HorizontalScroll>

      {categoryContentData?.map((section) => (
        <div key={section.id}>
          <Title text={section.title} className="text-[18px] pt-4" />
          <HorizontalScroll>
            <div className="flex flex-row gap-4 pt-[9px]">
              {section.categoryContent?.map((item) => (
                <Category key={item.id} content={item} />
              ))}
            </div>
          </HorizontalScroll>
        </div>
      ))}

      {guruContentData?.map((section) => (
        <div key={section.id} className="rounded-full">
          <Title text={section.title} className="text-[18px] pt-4" />
          <HorizontalScroll>
            <div className="flex flex-row gap-4 pt-[9px] rounded-full">
              {section.tagContent?.map((item) => (
                <Card key={item.id} content={item} />
              ))}
            </div>
          </HorizontalScroll>
        </div>
      ))}

      <Title text="Popular In Community" className="text-[18px] pt-4" />
      <HorizontalScroll>
        <div className="flex flex-row gap-4 pt-[9px]">
          {popularContent.map((item) => (
            <SingleVideocard key={item.id} content={item} />
          ))}
        </div>
      </HorizontalScroll>
    </div>
  );
};

export default Page;

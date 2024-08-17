"use client";
import React, { useEffect, useState } from "react";
import HorizontalScroll from "../Scrolls/HorizontalScroll";
import SingleVideocard from "../SingleVideocard/SingleVideocard";
import Title from "../HeadingTitle/HeadingTitle";
import Card from "../Card/Card";
import Category from "../Category/Category";
import VideoScrollArea from "../VideoScrollArea/VideoScrollArea";
import { Library } from "lucide-react";

interface TagContentItem {
  id: string;
  title: string;
  thumbnail: string;
  likeCount: number;
}

interface CategoryResponseItem {
  id: string;
  title: string;
  visibility: string;
  categoryContent: CategoryContent[];
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

interface ContentItem {
  id: string;
  title: string;
  tagContent: TagContentItem[];
  createdAt: string;
}

const UserLibrary: React.FC = () => {
  const [latestcontent, setLatestContent] = useState<ContentItem[]>([]);
  const [popularcontent, setPopulerContent] = useState<ContentItem[]>([]);

  const [categoryContent, setCategoryContent] = useState<
    CategoryResponseItem[]
  >([]);
  const [guruContent, setGuruContent] = useState<TagContentItem[]>([]);
  const [deityContent, setDeityContent] = useState<TagContentItem[]>([]);
  const [guruHariDarshanContent, setGuruHariDarshanContent] = useState<
    CategoryContent[]
  >([]);
  const [bapsEventsContent, setBapsEventsContent] = useState<CategoryContent[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestContent = async () => {
    try {
      const response = await fetch(
        `https://devapi.cohort.social/library/organization/ae14cfba-f279-4cb5-ac01-8dfebcf41224/content/latest`
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
        `https://devapi.cohort.social/library/organization/ae14cfba-f279-4cb5-ac01-8dfebcf41224/content/category`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category content");
      }
      const result = await response.json();
      const content = result.data.content;

      // Set Guruhari Darshan dynamically
      const guruHariDarshan = content.find(
        (item: CategoryResponseItem) => item.title === "Guruhari Darshan"
      );

      // Set BAPS Events dynamically
      const bapsEvents = content.find(
        (item: CategoryResponseItem) => item.title === "BAPS Events"
      );

      if (guruHariDarshan) {
        setGuruHariDarshanContent(guruHariDarshan.categoryContent);
      }

      if (bapsEvents) {
        setBapsEventsContent(bapsEvents.categoryContent);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `https://devapi.cohort.social/library/organization/ae14cfba-f279-4cb5-ac01-8dfebcf41224/content/tags`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      const result = await response.json();

      const content = result.data.content;

      const guru = content.find((item: ContentItem) => item.title === "Guru");
      const deity = content.find((item: ContentItem) => item.title === "Deity");

      if (guru) {
        setGuruContent(guru.tagContent);
      }
      if (deity) {
        setDeityContent(deity.tagContent);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularContent = async () => {
    try {
      const response = await fetch(
        `https://devapi.cohort.social/library/organization/ae14cfba-f279-4cb5-ac01-8dfebcf41224/content/populer`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch popular content");
      }
      const result = await response.json();
      setPopulerContent(result.data.content);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestContent();
    fetchContent();
    fetchCategoryContent();
    fetchPopularContent();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto px-[16px] overflow-hidden">
      {/* Latest Content */}
      <Title text="Latest from Organisation" className="text-[18px] pt-4" />
      <HorizontalScroll>
        <div className="flex flex-row gap-4 pt-[9px]">
          {latestcontent.map((item) => (
            <SingleVideocard key={item.id} content={item} />
          ))}
        </div>
      </HorizontalScroll>
      {/* Category Content */}
      <Title text="Guruhari Darshan" className="text-[18px] pt-4" />
      <HorizontalScroll>
        <div className="flex flex-row gap-4 pt-[9px]">
          {guruHariDarshanContent.map((item) => (
            <Category key={item.id} content={item} />
          ))}
        </div>
      </HorizontalScroll>
      {/* BAPS Events Content */}
      <Title text="BAPS Events" className="text-[18px] pt-4" />
      <HorizontalScroll>
        <div className="flex flex-row gap-4 pt-[9px]">
          {bapsEventsContent.map((item) => (
            <Category key={item.id} content={item} />
          ))}
        </div>
      </HorizontalScroll>
      {/* Guru Content */}
      <Title text="Guru" className="text-[18px] pt-4" />
      <HorizontalScroll>
        <div className="flex flex-row gap-4 pt-[9px]">
          {guruContent.map((item) => (
            <Card key={item.id} content={item} />
          ))}
        </div>
      </HorizontalScroll>
      {/* Deity Content */}
      <Title text="Deity" className="text-[18px] pt-4" />
      <HorizontalScroll>
        <div className="flex flex-row gap-4 pt-[9px]">
          {deityContent.map((item) => (
            <Card key={item.id} content={item} />
          ))}
        </div>
      </HorizontalScroll>
      <Title text="Popular In Community" className="text-[18px] pt-4" />
      <HorizontalScroll>
        <div className="flex flex-row gap-4 pt-[9px]">
          {popularcontent.map((item) => (
            <SingleVideocard key={item.id} content={item} />
          ))}
        </div>
      </HorizontalScroll>
    </div>
  );
};

export default UserLibrary;

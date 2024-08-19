"use client";
import React, { useEffect, useState } from "react";
import LibrarySection from "../LibrarySection/LibrarySection";
interface CategoryContent {
  id: string;
  title: string;
  // Add other relevant fields here
}

interface LibraryContent {
  id: string;
  title: string;
  categoryContent: CategoryContent[];
  // Add other relevant fields here
}

const Library: React.FC = () => {
  const [libraryContent, setLibraryContent] = useState<LibraryContent[]>([]);

  useEffect(() => {
    // Replace with your API endpoint
    fetch(
      "https://devapi.cohort.social/library/organization/ae14cfba-f279-4cb5-ac01-8dfebcf41224/content/category"
    )
      .then((response) => response.json())
      .then((data) => {
        setLibraryContent(data.content);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {libraryContent.map((content) => (
        <LibrarySection key={content.id} title={content.title} />
      ))}
    </div>
  );
};

export default Library;

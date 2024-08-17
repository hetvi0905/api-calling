import React, { useEffect } from "react";

interface LibrarySectionProps {
  title: string;
  // Add other props if needed
}

const LibrarySection: React.FC<LibrarySectionProps> = ({ title }) => {
  useEffect(() => {
    document.title = title; // Dynamically set the document title
  }, [title]);

  return (
    <div>
      <h2>{title}</h2>
      {/* Render the content related to this section */}
      {/* You can iterate over categoryContent here if needed */}
    </div>
  );
};

export default LibrarySection;

// lib/apiService.ts
// In libraryapi.ts
export interface ContentItem {
  title: string;
  id: string;
  thumbnail?: string;
  isPaid: boolean;
  price: number | null;
  contentType: string;
  viewCount: number;
  createdAt: string;
}

export const fetchContentData = async (): Promise<ContentItem[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

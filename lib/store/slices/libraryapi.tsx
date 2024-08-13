export interface ContentItem {
  id: string;
  title: string;
  view_count?: string;
  name?: string;
  thumbnail?: string;
  isPaid?: boolean;
  price?: number;
  description?: string;
  contentType?: string;
  viewCount?: number;
  likeCount?: number;
  isUserLiked?: boolean | null;
  nextCursor?: string;
  latestComment?: {
    comment: string;
    userName: string;
    profileImage: string;
  } | null;
  playlist?: {
    id: string;
    title: string;
    thumbnail: string;
    likeCount: number;
    isUserLiked: boolean;
  } | null;
  collection?: {
    id: string;
    title: string;
    thumbnail: string;
    likeCount: number;
    isUserLiked: boolean;
  } | null;
  commentCount?: number;
  contentUrl?: string;
  type?: string;
  createdAt?: string;
  visibility?: string;
}

export interface CategoryDetail {
  id: string;
  type: string | null;
  price: number | null;
  title: string | null;
  isPaid: boolean | null;
  thumbnail: string | null;
  likeCount: number | null;
  viewCount: number | null;
  contentType: string | null;
}

export interface TagContent {
  id: string;
  title: string;
  thumbnail: string;
  likeCount: number;
}

export interface Content2 {
  id: string;
  title: string;
  tagContent: TagContent[];
  createdAt: string;
}

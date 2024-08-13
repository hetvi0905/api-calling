// lib/api.ts
import axios from "axios";
import { ContentItem } from "@/lib/store/slices/libraryapi";

const BASE_URL =
  "https://devapi.cohort.social/library/community/dd54d2a8-4155-43eb-b882-7972d619cad9/latest";

export const fetchContentItems = async (): Promise<ContentItem[]> => {
  try {
    const response = await axios.get<ContentItem[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching content items", error);
    throw error;
  }
};

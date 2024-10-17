export interface Article {
    title: string;
    link: string;
    contentSnippet: string;
    isoDate: string;
    image: string;
    value: string;
  }

// src/types.ts
export interface Document {
  id: number;
  title: string;
  url: string;
  content: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}
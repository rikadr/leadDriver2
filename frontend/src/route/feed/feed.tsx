import React from "react";
import { useFeed } from "./feed-api";

export const Feed: React.FC = () => {
  const feed = useFeed();
  return (
    <div className="space-y-2">
      <h1>Feed</h1>
      {feed.data?.data?.posts.map((post) => (
        <div className="p-2 bg-sky-200 hover:bg-sky-100 transition-colors duration-200 cursor-pointer">
          {post}
        </div>
      ))}
    </div>
  );
};

"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";


const POSTS = [
  { id: 1, title: "POST1" },
  { id: 2, title: "POST2" },
];

// Create a wrapper component for providing the QueryClient
function PostsWithQueryClient() {
const postsQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => POSTS, // Mocking an async function call
  });
  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <h1>Error...</h1>;
  return (
    <div>
      {postsQuery.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
  
export default PostsWithQueryClient;

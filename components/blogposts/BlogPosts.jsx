import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

import styles from "./blogPosts.module.scss";

export const BlogPosts = () => {
  const { blogPosts } = useContext(DataContext);

  return (
    <div className="container">
      {blogPosts.map((post, index) => (
        <div className="blogPost" key={index}>
          <p>{post.title}</p>
          <p>{post.perex}</p>
        </div>
      ))}
    </div>
  );
};

import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [topMenu, setTopMenu] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  // const [elements, setElements] = useState([]);

  useEffect(() => {
    console.log("Saved topMenu categories", topMenu);
  }, [topMenu]);

  useEffect(() => {
    console.log("Saved topCategories", topCategories);
  }, [topCategories]);

  useEffect(() => {
    console.log("Saved sections", sections);
  }, [sections]);

  useEffect(() => {
    console.log("Saved blogPosts", blogPosts);
  }, [blogPosts]);

  // useEffect(() => {
  //   console.log("Saved Elements", elements);
  // }, [elements]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://crappie-enormous-noticeably.ngrok-free.app/api/v1/homepage/content?sections=51,55&elements=toplinks,tips,favouritecategories",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();

      console.log("Fetched data:", jsonData);

      if (jsonData.top_menu && jsonData.top_menu.categories) {
        setTopMenu(jsonData.top_menu.categories);
      }

      if (jsonData.top_categories) {
        setTopCategories(jsonData.top_categories);
      }

      if (jsonData.sections) {
        setSections(jsonData.sections);
      }

      if (jsonData.blog_posts) {
        setBlogPosts(jsonData.blog_posts);
      }

      // if (jsonData.elements) {
      //   setElements(jsonData.elements);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{ topMenu, topCategories, sections, blogPosts }}
    >
      {children}
    </DataContext.Provider>
  );
};

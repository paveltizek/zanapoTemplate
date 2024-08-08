import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [topMenu, setTopMenu] = useState([]);

  useEffect(() => {
    console.log("saved topMenu categories", topMenu);
  }, [topMenu]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://crappie-enormous-noticeably.ngrok-free.app/api/v1/homepage/content",
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ topMenu }}>{children}</DataContext.Provider>
  );
};

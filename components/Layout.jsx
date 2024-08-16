import React, { useContext } from "react";
import { Header } from "./header/Header";
import { Banner } from "./banner/Banner";
import { Carousel } from "./carousel/Carousel"; // Import the Carousel component

import { DataContext } from "./contexts/DataContext";

export const Layout = ({ children }) => {
  const { sections } = useContext(DataContext);

  return (
    <>
      <Header />
      <Banner />
      {sections.map((section, index) => (
        <Carousel key={index} section={section} /> // Map over sections and render a Carousel for each
      ))}
      {/* <TopCategories /> */}
    </>
  );
};

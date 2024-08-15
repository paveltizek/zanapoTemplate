import React from "react";
import { Header } from "./header/Header";
import { Banner } from "./banner/Banner";
// import { TopCategories } from "./topCategories/TopCategories";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Banner />
      {/* <TopCategories /> */}
    </>
  );
};

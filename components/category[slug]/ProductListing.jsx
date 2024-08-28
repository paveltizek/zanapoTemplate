import React from "react";

import { FilterComponent } from "./filterComponent/FilterComponent";

export const ProductListing = ({ filterCategories, handleCheckboxChange }) => {
  console.log("Gettting this", filterCategories);
  return (
    <section>
      <FilterComponent
        filterCategories={filterCategories}
        handleCheckboxChange={handleCheckboxChange}
      />
    </section>
  );
};

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./category.module.scss";

const Category = ({ category, onHover, onUnhover, isHovered }) => {
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [subCategoryHovered, setSubCategoryHovered] = useState(false);

  const handleCategoryMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    const timeoutId = setTimeout(() => {
      onHover();
    }, 400); // Delay before adding hover effect
    setHoverTimeout(timeoutId);
  };

  const handleCategoryMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    const timeoutId = setTimeout(() => {
      if (!subCategoryHovered) {
        onUnhover();
      }
    }, 400); // Delay before removing hover effect
    setHoverTimeout(timeoutId);
  };

  const handleSubCategoryMouseEnter = () => {
    setSubCategoryHovered(true);
  };

  const handleSubCategoryMouseLeave = () => {
    setSubCategoryHovered(false);
    // Delay before removing hover effect
    setTimeout(() => {
      if (!subCategoryHovered) {
        onUnhover();
      }
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <li
      className={`${styles.categoryItem} ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={handleCategoryMouseEnter}
      onMouseLeave={handleCategoryMouseLeave}
    >
      <div className={styles.categoryContent}>
        <img
          src={`https://test.zanapo.cz/${category.image}`}
          alt={category.name}
        />
        {category.name}
      </div>
      <div
        className={`${styles.subcategoryBlock} ${
          isHovered || subCategoryHovered ? styles.visible : ""
        }`}
        onMouseEnter={handleSubCategoryMouseEnter}
        onMouseLeave={handleSubCategoryMouseLeave}
      >
        <ul>
          {category.subcategories &&
            category.subcategories.map((subcategory) => (
              <li key={subcategory.name} className={styles.subcategoryItem}>
                <Image
                  src={`https://test.zanapo.cz/${subcategory.image}`}
                  alt={subcategory.name}
                  width={60}
                  height={60}
                />
                {subcategory.name}
              </li>
            ))}
        </ul>
      </div>
    </li>
  );
};

export default Category;

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./category.module.scss";

const Category = ({
  category,
  onHover,
  onUnhover,
  isHovered,
  hoveredCategoryName,
}) => {
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [subCategoryHovered, setSubCategoryHovered] = useState(false);

  const handleCategoryMouseEnter = () => {
    if (hoveredCategoryName === category.name) {
      return;
    }

    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    const timeoutId = setTimeout(() => {
      onHover(category.name);
    }, 100);
    setHoverTimeout(timeoutId);
  };

  const handleCategoryMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    const timeoutId = setTimeout(() => {
      if (!subCategoryHovered && hoveredCategoryName === category.name) {
        onUnhover(category.name);
      }
    }, 100);
    setHoverTimeout(timeoutId);
  };

  const handleSubCategoryMouseEnter = () => {
    setSubCategoryHovered(true);

    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const handleSubCategoryMouseLeave = () => {
    setSubCategoryHovered(false);

    const timeoutId = setTimeout(() => {
      if (!subCategoryHovered && hoveredCategoryName === category.name) {
        onUnhover(category.name);
      }
    }, 100);
    setHoverTimeout(timeoutId);
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
        <img src={`https://zanapo.cz/${category.image}`} alt={category.name} />
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
                  src={`https://zanapo.cz/${subcategory.image}`}
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

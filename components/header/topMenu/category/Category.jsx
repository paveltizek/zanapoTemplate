// Category.jsx
import React from "react";
import SubCategory from "./subcategory/SubCategory";
import styles from "./category.module.scss";

const Category = ({ category }) => {
  return (
    <li className={styles.categoryItem}>
      <div className={styles.categoryContent}>
        <img
          src={`https://test.zanapo.cz/${category.image}`}
          alt={category.name}
        />
        {category.name}
      </div>
      <div className={styles.subcategoryBlock}>
        <ul>
          {category.subcategories &&
            category.subcategories.map((subcategory) => (
              <SubCategory key={subcategory.id} subcategory={subcategory} />
            ))}
        </ul>
      </div>
    </li>
  );
};

export default Category;

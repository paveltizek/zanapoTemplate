import React from "react";
import styles from "./subCategoriesMenu.module.scss"; // Import the SCSS module

const SubCategoriesMenu = ({ category, onBack }) => {
  return (
    <div className={styles.subCategoriesContainer}>
      <ul className={styles.subCategoryList}>
        {category.subcategories.map((sub) => (
          <li key={sub.id} className={styles.subCategoryItem}>
            <span>{sub.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategoriesMenu;

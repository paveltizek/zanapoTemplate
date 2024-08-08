// subcategory/SubCategory.jsx
import React from "react";
import styles from "./subcategory.module.scss";

const SubCategory = ({ subcategory }) => {
  return (
    <li className={styles.subcategoryItem}>
      <img
        src={`https://test.zanapo.cz/${subcategory.image}`}
        alt={subcategory.name}
      />
      <span className={styles.subcategoryName}>{subcategory.name}</span>
    </li>
  );
};

export default SubCategory;

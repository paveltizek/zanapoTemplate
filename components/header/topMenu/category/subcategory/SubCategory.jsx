// subcategory/SubCategory.jsx
import React from "react";
import Image from "next/image";
import styles from "./subcategory.module.scss";

const SubCategory = ({ subcategory }) => {
  return (
    <li className={styles.subcategoryItem}>
      {/* <img
        src={`https://test.zanapo.cz/${subcategory.image}`}
        alt={subcategory.name}
      /> */}
      <Image
        src={`https://test.zanapo.cz/${subcategory.image}`}
        alt={subcategory.name}
        width={60}
        height={60}
      />
      <span className={styles.subcategoryName}>{subcategory.name}</span>
    </li>
  );
};

export default SubCategory;

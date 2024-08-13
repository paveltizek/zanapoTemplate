// TopMenuMobile.jsx
import React, { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import styles from "./topMenuMobile.module.scss";

const TopMenuMobile = () => {
  const { topMenu } = useContext(DataContext);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleExpandClick = (categoryName) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };

  return (
    <div className={styles.mobileMenuContainer}>
      <ul className={styles.dropdownMenu}>
        {topMenu.map((category) => (
          <li
            key={category.name}
            className={`${styles.mobileMenuItem} ${
              expandedCategory === category.name ? styles.expanded : ""
            }`}
          >
            <div className={styles.categoryHeader}>
              <img
                src={`https://zanapo.cz/${category.image}`}
                alt={category.name}
                className={styles.categoryIcon}
              />
              <span>{category.name}</span>
              {category.subcategories && category.subcategories.length > 0 ? (
                <span
                  className={styles.expandIcon}
                  onClick={() => handleExpandClick(category.name)}
                >
                  {expandedCategory === category.name ? "-" : "+"}
                </span>
              ) : (
                <span className={styles.expandIcon}>&nbsp;</span>
              )}
            </div>
            {expandedCategory === category.name &&
              category.subcategories &&
              category.subcategories.length > 0 && (
                <ul className={styles.subcategoryList}>
                  {category.subcategories.map((sub) => (
                    <li key={sub.id} className={styles.subcategoryItem}>
                      {/* <img
                        src={`https://test.zanapo.cz/${sub.image}`}
                        alt=""
                        width={30}
                        height={30}
                      /> */}
                      {sub.name}
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopMenuMobile;

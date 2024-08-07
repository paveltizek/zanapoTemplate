import React from "react";

import styles from "./categories.module.scss";

export const Categories = () => {
  return (
    <div className={`${styles.menuButton}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
      >
        <path d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"></path>
      </svg>
      {/* <div className={`${styles.menuArrow}`}> */}
      <p>Menu</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        className={`${styles.arrow}`}
      >
        <path
          d="M8 10l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        ></path>
      </svg>
      {/* </div> */}
    </div>
  );
};

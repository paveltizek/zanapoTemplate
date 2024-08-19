import React from "react";
import styles from "./ratings.module.scss";

export const Ratings = ({ ratingAverage, ratingCount }) => {
  const renderStars = () => {
    const fullStars = Math.floor(ratingAverage);
    const halfStar = ratingAverage % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars).fill(<span className={styles.star}>★</span>)}
        {halfStar && <span className={styles.star}>☆</span>}
        {Array(emptyStars).fill(<span className={styles.star}>☆</span>)}
      </>
    );
  };

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.stars}>{renderStars()}</div>
      <p className={styles.ratingCount}>({ratingCount} hodnocení)</p>
    </div>
  );
};

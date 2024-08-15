import React, { useState } from "react";
import styles from "./banner.module.scss";

export const Banner = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    "https://test.zanapo.cz/files/thumbs/d20d4aefaa0c290f8774b104f6a93b40/5e33752d5d546bb92d49a41e3b0e3c951a96a76679d4e064282daf7c11b66798-1456x.webp",
    "https://test.zanapo.cz/files/thumbs/21999d663177aab1c5467673a0516f18/e14a11251d09b314e0c33b0fb536beba81ce6c63e28ae7157733992eac6afab5-1456x.webp",
    // Add more images if needed
  ];

  const handlePreviousClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex((prevIndex) => {
      if (prevIndex === 0) {
        setTimeout(() => {
          setIsTransitioning(false);
          setSelectedIndex(images.length - 1);
        }, 500); // The duration of the slide transition
        return prevIndex - 1; // Trigger the transition to the previous slide
      }
      setTimeout(() => setIsTransitioning(false), 500);
      return prevIndex - 1;
    });
  };

  const handleNextClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex((prevIndex) => {
      if (prevIndex === images.length - 1) {
        setTimeout(() => {
          setIsTransitioning(false);
          setSelectedIndex(0);
        }, 500); // The duration of the slide transition
        return prevIndex + 1; // Trigger the transition to the next slide
      }
      setTimeout(() => setIsTransitioning(false), 500);
      return prevIndex + 1;
    });
  };

  return (
    <section id={styles.bannerWrapper} className="container">
      <button className={styles.prevButton} onClick={handlePreviousClick}>
        &#8249;
      </button>
      <div className={styles.imageContainer}>
        <div
          className={styles.slider}
          style={{
            transform: `translateX(-${(selectedIndex + 1) * 100}%)`,
            transition: isTransitioning ? "transform 0.5s ease" : "none",
          }}
        >
          <img
            src={images[images.length - 1]} // The last image appears first for seamless transition
            alt={`Banner ${images.length}`}
            className={styles.bannerImage}
          />
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Banner ${index + 1}`}
              className={styles.bannerImage}
            />
          ))}
          <img
            src={images[0]} // The first image appears last for seamless transition
            alt={`Banner 1`}
            className={styles.bannerImage}
          />
        </div>
      </div>
      <button className={styles.nextButton} onClick={handleNextClick}>
        &#8250;
      </button>
    </section>
  );
};

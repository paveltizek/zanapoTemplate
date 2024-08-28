import React, { useEffect, useContext, useState } from "react";
import { DataContext } from "../components/contexts/DataContext";
import { CategoryLayout } from "../components/CategoryLayout";

import styles from "./slug.module.scss";

import Image from "next/image";

const CategoryPage = ({ data }) => {
  const { setTopMenu } = useContext(DataContext);
  const [showLongDescription, setShowLongDescription] = useState(false);
  const [bestProducts, setBestProducts] = useState([]);
  const [apiElements, setApiElements] = useState([]);

  console.log("received from api", data);

  const { category, top_menu: topMenu, best_products, elements } = data;

  useEffect(() => {
    if (topMenu && setTopMenu) {
      setTopMenu(topMenu.categories);
    }

    if (best_products) {
      setBestProducts(best_products);
    }

    if (elements) {
      setApiElements(elements);
    }
  }, [topMenu, setTopMenu, best_products, elements]);

  if (!category) {
    return <div>Kategorie nenalezena</div>;
  }

  const toggleDescription = () => {
    setShowLongDescription((prevState) => !prevState);
  };

  return (
    <section className={`${styles.contentWrapperHead}`}>
      <div className="container-fluid">
        <div className="col-12 pb-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 12L11.2045 3.04549C11.6438 2.60615 12.3562 2.60615 12.7955 3.04549L21.75 12M4.5 9.75V19.875C4.5 20.4963 5.00368 21 5.625 21H9.75V16.125C9.75 15.5037 10.2537 15 10.875 15H13.125C13.7463 15 14.25 15.5037 14.25 16.125V21H18.375C18.9963 21 19.5 20.4963 19.5 19.875V9.75M8.25 21H16.5"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          dropbecky
        </div>

        <div className="row">
          {/* Category Info Section */}
          <div className="col-lg-7 align-self-start">
            <h2>{category.name}</h2>
            <div
              className={styles.categoryText}
              dangerouslySetInnerHTML={{ __html: category.description_short }}
            ></div>
            {category.description != null && (
              <>
                <div className={styles.buttonWrapper}>
                  <button
                    onClick={toggleDescription}
                    className={styles.descriptionToggleButton}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 -960 960 960"
                      className={`${styles.arrowIcon} ${
                        showLongDescription ? styles.opened : ""
                      }`}
                    >
                      <path d="M480-344 240-584l56-56 184 184 184-184 56 56z" />
                    </svg>
                  </button>
                </div>
                <div className={styles.expandingContent}>
                  {showLongDescription && (
                    <div
                      className={styles.categoryText}
                      dangerouslySetInnerHTML={{ __html: category.description }}
                    />
                  )}
                </div>
              </>
            )}

            <div className="d-none d-md-flex">
              {apiElements != null &&
                apiElements.map((elem) => (
                  <div
                    key={elem.identifier}
                    className={styles.element}
                    dangerouslySetInnerHTML={{ __html: elem.content }}
                  ></div>
                ))}
            </div>
          </div>

          {/* Top Sellers Section */}
          <div className={`col-lg-5  ${styles.topProducts}`}>
            <h4 className={styles.topHeading}>Nejprodávanější</h4>
            {bestProducts.map((product) => (
              <div key={product.variant_id} className={styles.productCard}>
                <div className="productImageWrapper">
                  <Image
                    src={`https://zanapo.cz/${product.image}`}
                    alt={product.name}
                    width={100}
                    height={100}
                    className={`${styles.productImage} img-fluid`}
                  />
                </div>
                <div className={`${styles.productText} `}>
                  <h4 className={styles.productName}>{product.name}</h4>
                  <p className={`${styles.productDescription}`}>
                    {product.description_short}
                  </p>

                  <p className={`${styles.productPrice}`}>{product.price_f}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="row">
                {category.subcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className="col-6 col-sm-3  col-lg-2 mb-3"
                  >
                    <div className={`${styles.subcategoryCard}`}>
                      {/* <Link href={subcategory.url}> */}
                      <Image
                        src={`https://zanapo.cz/${subcategory.image}`}
                        alt={subcategory.name}
                        width={60}
                        height={60}
                        className={`${styles.subcategoryImage} img-fluid`}
                      />
                      <h3 className={styles.subcategoryName}>
                        {subcategory.name}
                      </h3>
                      {/* </Link> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export async function getServerSideProps({ params }) {
  const { slug } = params;

  const res = await fetch(
    `http://pavel-fedora.tailcfce08.ts.net:8000/api/v1/url/content?requested_path=/${slug}&elements=categoryfaq`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  console.log("Fetching at", res);

  const data = await res.json();

  //console.log("API Response:", data);

  if (!data || !data.category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data, // Pass the entire data object
    },
  };
}

CategoryPage.getLayout = function getLayout(page) {
  return <CategoryLayout>{page}</CategoryLayout>;
};

export default CategoryPage;

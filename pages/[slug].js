import React, { useEffect, useContext, useState } from "react";
import { DataContext } from "../components/contexts/DataContext";
import { CategoryLayout } from "../components/CategoryLayout";

import styles from "./slug.module.scss";

import Image from "next/image";

const CategoryPage = ({ data }) => {
  const { setTopMenu } = useContext(DataContext);
  const [showLongDescription, setShowLongDescription] = useState(false);

  console.log("received from api", data);

  const { category, top_menu: topMenu, products } = data;

  useEffect(() => {
    if (topMenu && setTopMenu) {
      setTopMenu(topMenu.categories);
    }
  }, [topMenu, setTopMenu]);

  if (!category) {
    return <div>Kategorie nenalezena</div>;
  }

  const toggleDescription = () => {
    setShowLongDescription((prevState) => !prevState);
  };

  const topSellers = products.slice(0, 2);

  return (
    <div className={`${styles.contentWrapper}`}>
      <div className="container-fluid">
        <div className="row">
          {/* Category Info Section */}
          <div className="col-md-8 align-self-start">
            <h2>{category.name}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: category.description_short }}
            ></div>
            {category.description != null && (
              <>
                <button onClick={toggleDescription}>Dlouhe</button>
                {showLongDescription && (
                  <div
                    dangerouslySetInnerHTML={{ __html: category.description }}
                  />
                )}
              </>
            )}
          </div>

          {/* Top Sellers Section */}
          <div className={`col-md-4 align-self-start ${styles.topProducts}`}>
            <h4 className={styles.topHeading}>Nejprodávanější</h4>
            <div>
              {topSellers.map((product) => (
                <div key={product.product_id}>
                  <div className={styles.productCard}>
                    <Image
                      src={`https://zanapo.cz/${product.image}`}
                      alt={product.name}
                      width={100}
                      height={100}
                      className={`${styles.productImage} img-fluid`}
                    />
                    <h4 className={styles.productName}>{product.name}</h4>
                    <p className={styles.productPrice}>{product.price_f}</p>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
};
export async function getServerSideProps({ params }) {
  const { slug } = params;

  const res = await fetch(
    `http://pavel-fedora.tailcfce08.ts.net:8000/api/v1/url/content?requested_path=/${slug}`,
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

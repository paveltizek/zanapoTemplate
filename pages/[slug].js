import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../components/contexts/DataContext";
import { CategoryLayout } from "../components/CategoryLayout";

import styles from "./slug.module.scss";

const CategoryPage = ({ category, topMenu }) => {
  const { setTopMenu } = useContext(DataContext);
  const [showLongDescription, setShowLongDescription] = useState(false);

  useEffect(() => {
    if (topMenu && setTopMenu) {
      setTopMenu(topMenu);
    }
  }, [topMenu, setTopMenu]);

  console.log("Fetched category data:", category);

  if (!category) {
    return <div>Kategorie nenalezena</div>;
  }

  const toggleDescription = () => {
    setShowLongDescription((prevState) => !prevState);
  };

  return (
    <div className={styles.contentWrapper}>
      <div className="container-fluid">
        <h2>{category.name}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: category.description_short }}
          className="left-side_off col-md-7 col-lg-7"
        />

        {category.description != null && (
          <>
            <button onClick={toggleDescription}>Dlouhe</button>
            {showLongDescription && (
              <div
                dangerouslySetInnerHTML={{ __html: category.description }}
                className="left-side_off col-md-7 col-lg-7"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Fetch the category data based on the slug (which now represents the category ID)
  const res = await fetch(
    `http://pavel-fedora.tailcfce08.ts.net:8000/api/v1/category/detail/${slug}`
  );

  const data = await res.json();

  console.log("API Response:", data);

  if (!data || !data.category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category: data.category,
      topMenu: data.top_menu.categories,
    },
  };
}

CategoryPage.getLayout = function getLayout(page) {
  return <CategoryLayout>{page}</CategoryLayout>;
};

export default CategoryPage;

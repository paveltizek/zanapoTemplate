import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../components/contexts/DataContext";
import { CategoryLayout } from "../components/CategoryLayout";

const CategoryPage = ({ category, topMenu }) => {
  const { setTopMenu } = useContext(DataContext);

  useEffect(() => {
    if (topMenu && setTopMenu) {
      setTopMenu(topMenu);
    }
  }, [topMenu, setTopMenu]);

  console.log("Fetched category data:", category);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <h1>{category.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: category.description }} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const res = await fetch(
    `https://crappie-enormous-noticeably.ngrok-free.app/api/v1/category/detail/51`
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

import React from "react";
import { Layout } from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home = () => {
  return (
    <>
      <Layout />
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "cz", ["common"])),
    },
  };
}

export default Home;

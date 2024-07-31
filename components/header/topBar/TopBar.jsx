import React from "react";
import CountryDropDown from "../languageSwitcher/CountryDropDown";
import styles from "./topbar.module.scss";
import { useTranslation } from "next-i18next";

export const TopBar = () => {
  const { t, i18n } = useTranslation("common");

  // console.log("Current Language:", i18n.language);
  // console.log(
  //   "Loaded Translations:",
  //   i18n.getResourceBundle(i18n.language, "common")
  // );
  // console.log("Translation for help_text:", t("help_text"));

  return (
    <div className={styles.topBar}>
      <p className={styles.helpText}>{t("help_text")}</p>
      <CountryDropDown />
    </div>
  );
};

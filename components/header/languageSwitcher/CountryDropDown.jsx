import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";
import styles from "./dropdown.module.scss";

const countries = [
  {
    name: "Česká republika",
    flag: "https://www.zanapo.cz/resources/shared/flags/4x3/cs.svg",
    locale: "cz",
  },
  {
    name: "Slovensko",
    flag: "https://www.zanapo.cz/resources/shared/flags/4x3/sk.svg",
    locale: "sk",
  },
];

const CountryDropDown = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLocale = Cookies.get("NEXT_LOCALE") || "cz";
    const country = countries.find((c) => c.locale === storedLocale);
    if (country) {
      setSelectedCountry(country);
      i18n.changeLanguage(storedLocale).then(() => {
        console.log(
          "Loaded Translations after language change:",
          i18n.getResourceBundle(storedLocale, "common")
        );
      });
    }
  }, [i18n]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    i18n.changeLanguage(country.locale).then(() => {
      Cookies.set("NEXT_LOCALE", country.locale);
      console.log(
        "Loaded Translations after language change:",
        i18n.getResourceBundle(country.locale, "common")
      );
    });
  };

  return (
    <div>
      <div
        className={styles["selected-flag"]}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Image
          src={selectedCountry.flag}
          width={32}
          height={24}
          alt={`${selectedCountry.name} flag`}
        />
        <div className={styles.arrow}></div>
      </div>
      {showDropdown && (
        <div className={styles.dropdown}>
          {countries.map((c) => (
            <div
              key={c.name}
              onClick={() => handleCountrySelect(c)}
              className={styles["dropdown-item"]}
            >
              <Image
                src={c.flag}
                width={32}
                height={24}
                alt={`${c.name} flag`}
              />
              <p>{c.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryDropDown;

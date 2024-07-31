const path = require("path");

module.exports = {
  i18n: {
    locales: ["cz", "sk"],
    defaultLocale: "cz",
    localeDetection: true,
  },
  localePath: path.resolve("./locales"),
};

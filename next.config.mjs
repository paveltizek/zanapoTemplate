import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { i18n } = require("./next-i18next.config.js");

export default {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
  i18n,
};

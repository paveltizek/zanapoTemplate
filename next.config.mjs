import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
};

// _app.js
import "../styles/main.scss";
import "../styles/global.scss";

import { LanguageProvider } from "../components/contexts/LanguageContext";
import { DataProvider } from "../components/contexts/DataContext";
function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </LanguageProvider>
  );
}

export default MyApp;

// _app.js
import "../styles/main.scss";
import "../styles/global.scss";
import { LanguageProvider } from "../components/contexts/LanguageContext";

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;

import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import enJSON from "./translations/en";
import ptJSON from "./translations/pt";
import i18next from "i18next";
// import esJSON from "./translations/es";

const resources = {
  en: { translation: enJSON },
  pt: { translation: ptJSON },
  // es: { translation: esJSON },
};

i18n
  // .use()
  .use(initReactI18next)
  .init({
    resources,
    keySeparator: false,
    lng: "pt",
    fallbackLng: "en",
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

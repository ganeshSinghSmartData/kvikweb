import i18next from "i18next";
import en from "./en";
import nl from "./nl";
const resources = {
  en: {
    translation: en
  },
  nl: {
    translation: nl
  }
};
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en", // language to use
  fallbackLng: "en",
  debug: true,
  resources
});
export const getTranslations = (val) => i18next.t(val);
export const changeLanguage = (lang) => i18next.changeLanguage(lang);
export const getCurrentLanguage = () => i18next.language;
export default i18next;

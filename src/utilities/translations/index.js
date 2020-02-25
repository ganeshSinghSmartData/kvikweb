import i18next from "i18next";
import en from "./en";
import { getAllTranslation } from "../../actions/translations";
import { storeObj } from "../../config";
import { LANGUAGE_CHANGED, IS_FETCHING } from "../../actions/constants";

var resources = {
  en: {
    translation: en
  }
};

var translations = [];

getAllTranslation().then((res) => {
  storeObj.store.dispatch({ type: IS_FETCHING, status: true });
  translations = Object.keys(res);
  i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: storeObj.store.getState().user.lang || "en", // language to use
    fallbackLng: "en",
    debug: true,
    resources: res || resources
  });
  storeObj.store.dispatch({ type: IS_FETCHING, status: false });
});

export const getTranslations = (val) => i18next.t(val);
export const changeLanguage = (lang) => {
  storeObj.store.dispatch({ type: LANGUAGE_CHANGED, data: lang });
  i18next.changeLanguage(lang);
};
export const getCurrentLanguage = () => i18next.language;
export const getAvailableTranslations = () => translations;
export default i18next;

import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
export const getAllTranslation = () => {
  return ApiClient.get(`${apiUrl}/language/translations/all?type=web`).then(
    (response) => {
      if (response.data) {
        return response.data.reduce((d, i) => {
          d[i.language] = { translation: i.translations };
          return d;
        }, {});
      }
    }
  );
};

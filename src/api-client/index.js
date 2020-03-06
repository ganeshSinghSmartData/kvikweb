/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: smartData
 */
import axios from "axios";
import querystring from "querystring";
import { setAuthorizationToken } from "../authorization";
import { getCurrentLanguage } from "../utilities/translations";

var config = {
  headers: {
    "Content-Type": "application/json"
  }
};

var langHeaders = () => {
  return {
    headers: {
      ...config.headers,
      lang: (getCurrentLanguage() && getCurrentLanguage().toLowerCase()) || "en"
    }
  };
};

class ApiClient {
  static post(url, params, token = null) {
    if (token) {
      setAuthorizationToken(axios, token);
    }
    return new Promise(function(fulfill, reject) {
      axios
        .post(url, JSON.stringify(params), langHeaders())
        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static put(url, params, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise(function(fulfill, reject) {
      axios
        .put(url, JSON.stringify(params), langHeaders())
        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static get(url, params, token = null) {
    setAuthorizationToken(axios, token);
    let query = querystring.stringify(params);
    url = query ? `${url}?${query}` : url;

    return new Promise(function(fulfill, reject) {
      axios
        .get(url, langHeaders())
        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static fetch(url, params, token = null) {
    // setAuthorizationToken(axios, token);
    let query = querystring.stringify(params);
    url = query ? `${url}?${query}` : url;
    return new Promise(function(fulfill, reject) {
      axios
        .get(url, langHeaders())

        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static patch(url, params, token = null) {
    return new Promise(function(fulfill, reject) {
      axios
        .patch(url, JSON.stringify(params), langHeaders())
        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static delete(url, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise(function(fulfill, reject) {
      axios
        .delete(url, langHeaders())
        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
  /*************** Form-Data Method without file for Create ***********/
  static _postFormData(url, params, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise(function(fulfill, reject) {
      axios
        .post(url, params, {
          ...langHeaders(),
          ...{ headers: { "Content-Type": "multipart/form-data" } }
        })

        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data Method for Update ***********/
  static _putFormData(url, params, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise(function(fulfill, reject) {
      // var body = new FormData();
      // body.append("file", params);
      axios
        .put(url, params, {
          ...langHeaders(),
          ...{ headers: { "Content-Type": "multipart/form-data" } }
        })

        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data with file Method ***********/
  static postFormData(url, params, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise(function(fulfill, reject) {
      var body = new FormData();
      body.append("file", params);
      axios
        .post(url, body, {
          ...langHeaders(),
          ...{ headers: { "Content-Type": "multipart/form-data" } }
        })

        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
}

export default ApiClient;

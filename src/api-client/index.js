/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: smartData
 */
import axios from "axios";
import querystring from "querystring";
import { setAuthorizationToken } from "../authorization";

var config = {
  headers: { "Content-Type": "application/json" }
};

class ApiClient {
  static post(url, params, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise(function(fulfill, reject) {
      axios
        .post(url, JSON.stringify(params), config)

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
        .put(url, JSON.stringify(params), config)
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
    console.log("url: ", url);

    return new Promise(function(fulfill, reject) {
      axios
        .get(url, config)

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
    console.log("url: ", url);

    return new Promise(function(fulfill, reject) {
      axios
        .get(url, config)

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
        .patch(url, JSON.stringify(params), config)
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
        .delete(url, config)
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
          ...config,
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
          ...config,
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
          ...config,
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

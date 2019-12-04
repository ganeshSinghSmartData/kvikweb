/*
 * @file: index.js
 * @description: It Contain environment variables.
 * @date: 04.07.2018
 * @author: smartData
 */

const local = {
  apiUrl: "http://172.24.4.68:3000"
  /*   socketUrl: "http://172.24.5.111:3000",
  file: "http://172.24.5.111:3000/api",
  JWT: {
    key: "jetx-services",
    algo: "HS512"
  } */
};

const staging = {
  apiUrl: "http://54.71.18.74:4599"
  /*   socketUrl: 'http://3.18.168.191:3005',
  file: 'http://3.18.168.191:3000/api',
  JWT: {
    key: 'jetX-services',
    algo: 'HS512'
  } */
};

const production = {
  apiUrl: "http://3.18.168.191:3000/api/v1"
  /*   socketUrl: 'http://3.18.168.191:3005',
  file: 'http://3.18.168.191:3000/api',
  JWT: {
    key: 'jetX-services',
    algo: 'HS512'
  } */
};

if (process.env.REACT_APP_ENV === "prod") {
  module.exports = production;
} else {
  module.exports = staging;
}

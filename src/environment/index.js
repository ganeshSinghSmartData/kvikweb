/*
 * @file: index.js
 * @description: It Contain environment variables.
 * @date: 04.07.2018
 * @author: smartData
 */

const local = {
  apiUrl: "http://172.24.4.68:3000",
  socketUrl: "http://172.24.4.68:3000"
};

const staging = {
  apiUrl: "http://54.71.18.74:4599"
};

const production = {
  apiUrl: "http://3.18.168.191:3000/api/v1"
};

if (process.env.REACT_APP_ENV === "prod") {
  module.exports = production;
} else if (process.env.REACT_APP_ENV === "dev") {
  module.exports = staging;
} else {
  module.exports = local;
}

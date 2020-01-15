/*
 * @file: index.js
 * @description: It Contain environment variables.
 * @date: 05.12.2019
 * @author: smartData
 */


const local = {
  apiUrl: "http://localhost:3000",
  socketUrl: "http://localhost:3000",
  // apiUrl: "http://172.24.4.68:3000",
  // socketUrl: "http://172.24.4.68:3000",
  stripeKey: "pk_test_DwzVvw7dIyntcsbXh6OsNVS200eXzmTfcz"
};

const staging = {
  apiUrl: "http://54.71.18.74:4599",
  socketUrl: "http://54.71.18.74:4599",
  stripeKey: "pk_test_DwzVvw7dIyntcsbXh6OsNVS200eXzmTfcz"
};

const production = {
  apiUrl: "http://54.71.18.74:4599",
  socketUrl: "http://54.71.18.74:4599",
  stripeKey: "pk_test_DwzVvw7dIyntcsbXh6OsNVS200eXzmTfcz"
};

if (process.env.REACT_APP_ENV === "prod") {
  module.exports = production;
} else if (process.env.REACT_APP_ENV === "dev") {
  // module.exports = local;
  module.exports = staging;
} else {
  module.exports = local;
  // module.exports = staging;
}

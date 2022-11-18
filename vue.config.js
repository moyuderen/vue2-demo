"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 9527,
    disableHostCheck: true,
    // proxy: {
    //   "/apiMd": {
    //     // target: 'http://dev-opay-common-user-admin-web.k8s.opayweb.com/',
    //     target: "https://g3-opay-common-user-admin-web.kong.opayweb.com",
    //     // target: 'https://uat-admin.opayeg.com/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/apiMd": "",
    //     },
    //   },
    // },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
};

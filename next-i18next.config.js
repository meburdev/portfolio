// next-i18next.config.js

// Usamos require en lugar de import para mantener la sintaxis CommonJS
const path = require("path");

module.exports = {
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
    localePath: path.resolve("./public/static/locales"),
  },
};

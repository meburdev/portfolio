// next-i18next.config.js

// Usamos require en lugar de import para mantener la sintaxis CommonJS
const path = require("path");

module.exports = {
  // 🧠 CLAVE: Exportamos el objeto de configuración directamente
  i18n: {
    // Supported languages
    locales: ["es", "en"],
    // The default language if none is specified
    defaultLocale: "en",
    // The path where your translation files are located
    localePath: path.resolve("./public/static/locales"),
  },
};

const preprocess = require("svelte-preprocess");

module.exports = {
  compilerOptions: {
    hydratable: true,
  },
  preprocess: preprocess(),
  extensions: [".svelte"],
};

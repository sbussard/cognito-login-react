module.exports = {
  "parser": "babel-eslint",
  "env": {
    es6: true,
    jasmine: true
  },
  "extends": [
    "plugin:flowtype/recommended",
    "plugin:jasmine/recommended",
    ".target.eslintrc.js",
    ".extended.eslintrc.js"
  ],
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
  },
  "plugins": [
    "flowtype",
    "react",
    "jasmine"
  ],
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": false
    }
  }
};

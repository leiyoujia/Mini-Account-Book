module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    parserOptions: {
        parser: "babel-eslint"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "indent": ["error", 4],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 0,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }]
    }
};

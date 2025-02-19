const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => ({
  mode: argv.mode === "production" ? "production" : "development",

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === "production" ? false : "inline-source-map",
  entry: {
    index: "./src/index.ts",
    uiIndex: "./src/ui/scripts/index.ts", // This is the entry point for our plugin code.
  },
  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          "ts-loader",
          {
            loader: "webpack-preprocessor-loader",
            options: {
              directives: {},
              params: {
                api: env.api,
                env: env.env,
              },
            },
          },
        ],
      },
    ],
  },
  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
});

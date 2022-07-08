const process = require("process");
const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const filename = (ext) =>
  isDev ? `[name][contenthash].${ext}` : `[name].[fullhash].${ext}`;

const baseConfig = {
  entry: path.resolve(__dirname, "./src"),
  mode: "development",
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".css",
      ".scss",
      ".sass",
      ".json",
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".raw",
      ".tif",
      ".tiff",
      ".bmp",
      ".dib",
      ".ttf",
      ".otf",
      ".eot",
      ".svg",
      ".woff",
    ],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    assetModuleFilename: "assets/[name][ext][query]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        exclude: ["/node_modules/"],
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.css$/i,
        exclude: ["/node_modules/"],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
              // config: {
              //   path: 'postcss.config.js',
              // },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /.(png|gif|jpg|jpeg|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/i,
        type: "asset",
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode
    ? require("./webpack.prod.config")
    : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};

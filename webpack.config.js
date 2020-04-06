const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MimiCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const API = require('./api_config.js');

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;


const {
    DEV_SERVER_HOST = 'localhost',
    DEV_SERVER_PORT = '5000'
} = process.env;

const   DEV_DIR = 'dev',
        SRC_DIR = "src",
        DIST_DIR = "dist",
        STATIC_DIR = "static",
        PROJECT_NAME = "compiler_client";

const OUTPUT_PATH = isProd ? path.join(__dirname, DIST_DIR, STATIC_DIR) :  path.join(__dirname, DIST_DIR, DEV_DIR);

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if (isDev)
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    return config
}

let index_html = `../index-[hash].html`;
if (isDev) {
    index_html = path.join(__dirname, DIST_DIR, DEV_DIR, 'index.html');
}

module.exports = {
    context: path.resolve(__dirname, SRC_DIR),
    mode: process.env.NODE_ENV,
    entry: {
        [PROJECT_NAME]: ["@babel/polyfill", "./index.jsx"],
    },
    output: {
        filename: `[name]-[hash].js`,
        path:  OUTPUT_PATH
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            components: path.resolve(__dirname, "src/components/"),
            api: path.resolve(__dirname, "src/api/"),
            store: path.resolve(__dirname, "src/store/")
        }
    },
    optimization: optimization(),
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            },
            filename: index_html
        }),
        new MimiCssExtractPlugin({
            filename: `index-[hash].css`,
            chunkFilename: `index-[hash].css`,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/,
                use: [
                    {
                        loader: MimiCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: "/node_modules/",
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            '@babel/preset-react',
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread',
                        ]
                    }
                }
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: '[hash]-[name].[ext]'
                    }
                }]
            },
        ]
    },
    devServer: {
        port: DEV_SERVER_PORT,
        host: DEV_SERVER_HOST,
        hot: isDev,
        contentBase: path.join(__dirname, DIST_DIR, DEV_DIR),
        proxy: {
            "/compile": {
                target: "http://localhost:3000",
            },
            "/lexem": {
                target: "http://localhost:3000",
            }
        }
    },
    devtool: isDev ? "source-map" : ""
}
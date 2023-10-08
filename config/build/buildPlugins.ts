import { BuildOptions } from "./types/config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildPlugins({
  paths,
  isDev
}: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    // При запуске сборки проекта этот плагин будет автоматически создавать HTML-файл на основе заданных параметров. Он может использовать шаблон HTML-файла (как указано в параметре template) и вставлять в него ссылки на собранные JavaScript и CSS файлы, а также другие настройки, которые вы определите.
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    // Когда вы добавляете new webpack.ProgressPlugin() в массив плагинов вашей конфигурации Webpack, он будет автоматически включен при запуске сборки, и вы увидите индикацию прогресса в консоли во время выполнения сборки.
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/[name].[contenthash:8].css`,
      chunkFilename: `css/[name].[contenthash:8].css`,
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev)
    })
  ];
}

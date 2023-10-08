import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  // если не используем typescript - нужен babel-loader

  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => resPath.includes(".module."),
            localIdentName: isDev
              ? `[path][name]__[local]--[hash:base64:5]`
              : `[hash:base64:8]`,
          },
        },
      },
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const typescriptLoader = {
    // test: Это регулярное выражение, которое указывает Webpack, какие файлы должны быть обработаны этим загрузчиком. В данном случае, загрузчик ts-loader будет применяться к файлам, которые имеют расширение .ts или .tsx.
    test: /\.tsx?$/,
    // use: Здесь указывается, какой загрузчик следует применять к файлам, соответствующим условиям, заданным в test. В данном случае, используется загрузчик ts-loader, который предназначен для обработки TypeScript файлов
    use: "ts-loader",
    // exclude: Этот параметр определяет папки или файлы, которые должны быть исключены из обработки загрузчиком. В данном случае, файлы из папки node_modules не будут обрабатываться загрузчиком ts-loader.
    exclude: /node_modules/,
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  // возврат loaders имеет значение, поэтому присваиваем в отдельные переменные
  return [fileLoader, svgLoader, typescriptLoader, cssLoader];
}

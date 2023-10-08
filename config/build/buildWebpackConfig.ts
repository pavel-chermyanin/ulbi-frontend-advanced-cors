import path from "path";
import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { paths, mode, isDev } = options;
  return {
    mode,
    // entry - что мы хотим собрать
    // path для универсальной работы в разных средах
    // dirname - корень проекта
    entry: paths.entry,
    // output - куда мы хотим отправить сборку
    output: {
      // как будет называться собраный файл
      // [name]: Это плейсхолдер, который будет заменен на имя точки входа (entry point) вебпака, которое вы указали в свойстве entry конфигурации. Например, если вашей точкой входа является файл "src/index.js", то [name] будет заменено на "index". Это позволяет давать собранным файлам имена, основанные на именах точек входа.
      // [contenthash]: Это еще один плейсхолдер, который будет заменен на уникальный хеш (хэш-сумму) содержимого файла. Этот хеш генерируется на основе содержимого файла, и он изменяется только в случае, если содержимое файла изменяется. Это полезно для кеширования браузером, так как браузер будет загружать новую версию файла только в том случае, если хеш файла изменился. Это помогает обеспечить корректное обновление кешированных файлов при изменении кода.
      filename: "[name].[contenthash].js",
      // куда будет происходить сборка
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      // rules (или module.rules) в конфигурации Webpack используется для определения, какие загрузчики (loaders) следует применять к определенным файлам в процессе сборки. Загрузчики позволяют преобразовывать и обрабатывать файлы перед тем, как они будут включены в собранную сборку. В вашем примере:
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}

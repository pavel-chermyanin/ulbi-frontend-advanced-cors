import type webpack from 'webpack';
import { type BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(
    options: BuildOptions,
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
            filename: '[name].[contenthash].js',
            // куда будет происходить сборка
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}

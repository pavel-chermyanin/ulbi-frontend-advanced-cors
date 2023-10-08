import { BuildOptions } from "./types/config";
import { ResolveOptions } from "webpack";

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    extensions: [".tsx", ".ts", ".js"], // чтобы не писать расширение файла при его импорте
    preferAbsolute: true,
    modules: [options.paths.src, "node_modules"],
    mainFiles: ['index'],
    alias: {}
  };
}

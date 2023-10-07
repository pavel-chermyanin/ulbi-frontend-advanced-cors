import { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
  return {
    extensions: [".tsx", ".ts", ".js"], // чтобы не писать расширение файла при его импорте
  };
}

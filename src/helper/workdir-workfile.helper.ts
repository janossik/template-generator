import * as fs from "fs";
import * as path from "path";

export function createWorkdirPath(value: string = "controllers") {
  let currentPath = path.join(process.cwd(), value);

  if (fs.existsSync(path.join(process.cwd(), "src"))) {
    currentPath = path.join(process.cwd(), "src", value);
  } else if (fs.existsSync(path.join(process.cwd(), "src", value))) {
    currentPath = path.join(process.cwd(), "src", value);
  } else if (fs.existsSync(path.join(process.cwd(), "..", value))) {
    currentPath = path.join(process.cwd(), "..", value);
  } else if (fs.existsSync(path.join(process.cwd(), "..", "..", value))) {
    currentPath = path.join(process.cwd(), "..", "..", value);
  }

  return currentPath;
}

export function ensureFileExistsOrCreated<T extends string>(
  currentPath: string,
  type: string,
  props: Record<T, string> & Record<"name", string>,
  name: string,
  callback: VoidFunction
) {
  if (!fs.existsSync(path.join(currentPath, ...props.name.split("/").slice(0, -1), `${props.name.split("/").at(-1)}.${type}.ts`))) {
    if (!fs.existsSync(path.join(currentPath, ...props.name.split("/").slice(0, -1))))
      fs.mkdirSync(path.join(currentPath, ...props.name.split("/").slice(0, -1)), { recursive: true });

    callback();
    console.log(
      `\x1b[32mCreated ${type} \x1b[34m${name}\x1b[0m in \x1b[36m${path.join(
        currentPath,
        ...props.name.split("/").slice(0, -1),
        `${props.name.split("/").at(-1)}.${type}.ts`
      )}\x1b[0m\n`
    );
  } else {
    console.log(
      `\x1b[0m${type} \x1b[32m${name}\x1b[0m already exists in ${path.join(
        currentPath,
        ...props.name.split("/").slice(0, -1),
        `${props.name.split("/").at(-1)}.${type}.ts`
      )}`
    );
  }
}

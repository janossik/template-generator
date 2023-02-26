//console.log(process.argv);
import * as fs from "fs";
import * as path from "path";
import { generateCamelCaseName } from "./src/helper/name.helper";
import { question } from "./src/helper/readline.helper";
import { createWorkdirPath, ensureFileExistsOrCreated } from "./src/helper/workdir-workfile.helper";

const generateFileFromTemplate = async <T extends string>(
  type = "controller",
  questions: Record<T, string> & Record<"name", string>,
  createContent: (props: Record<T, string> & Record<"name", string>, name: string) => string
) => {
  try {
    // Create path to working directory.
    const currentPath = createWorkdirPath(`${type}s`);
    if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath, { recursive: true });

    // Prompt user for input and generate file name.
    const props = await question<T | "name">(questions);
    const name = generateCamelCaseName(props.name, "", type);

    // Check if file exists, if not, create it and write content.
    ensureFileExistsOrCreated(currentPath, type, props, name, () => {
      const content = createContent(props, name);
      fs.writeFileSync(path.join(currentPath, ...props.name.split("/").slice(0, -1), `${props.name.split("/").at(-1)}.${type}.ts`), content);
    });
  } catch (error) {
    console.error(`\x1b[31mAn error occurred while creating the file: \x1b[37m${error.message}\x1b[0m`);
  }
};

(async () => {
  switch (process.argv[2].toLowerCase()) {
    case "create":
      for await (const name of fs.readdirSync(path.join(__dirname, "src", "templates")).map((file) => file.split(".").at(0))) {
        if (process.argv[3].toLowerCase() === name) {
          return await import(`./src/templates/${process.argv[3].toLowerCase()}.template`).then(async (result) => {
            await generateFileFromTemplate(process.argv[3].toLowerCase(), result.props, result.default);
          });
        }
      }
      console.log(
        `\x1b[31mInvalid command. Available commands: ${fs
          .readdirSync(path.join(__dirname, "src", "templates"))
          .map((file) => file.split(".").at(0))
          .join(", ")}\x1b[0m`
      );
      break;
    default:
      console.log(`\x1b[31mInvalid command. Available commands: create\x1b[0m`);
      break;
  }
  process.exit(0);
})();

export const props = { name: "\x1b[32mName controller?", url: "\x1b[32mUrl controller?" };

export default (props: Record<"name" | "url", string>, name: string): string => {
  return `import { Controller } from "~/builder/controller";\n\nconst ${name} = new Controller("${props.url}");\n\n${name}.get("/:deviceId", (req, res, next) => {\n res.json({ message: "Hello, World" })\n})\n\nexport default ${name};`;
};

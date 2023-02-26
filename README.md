# Template Generator

It is a command-line tool that allows users to generate various files from templates. It is designed to help developers quickly create new files based on predefined templates for common use cases, such as creating controllers or services in a web application. The program prompts the user for input and generates a file based on the user's responses and the selected template. It is intended to save time and increase productivity by automating repetitive tasks involved in file creation.

## Prerequisites

This project requires Node.js and npm to be installed.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run npm install to install dependencies.

## Usage

The tool is run from the command line using the following syntax:

```bash
node index.js <command> <template>
```

```bash
ts-node index.js <command> <template>
```

## Commands

`create` - generates a file from a template.

## Templates

Templates are stored in the src/templates directory and are named `<template name>`.template.ts. Each template exports a create function that takes a set of properties and generates a file. Additionally, a props object should be defined to allow querying function arguments.

### Example Template

```typescript
//      src/templates/controller.template.ts
export const props = { name: "\x1b[32mName controller?", url: "\x1b[32mUrl controller?" };

export default (props: Record<"name" | "url", string>, name: string): string => {
  return `import { Controller } from "~/builder/controller";\n\nconst ${name} = new Controller("${props.url}");\n\n${name}.get("/:deviceId", (req, res, next) => {\n res.json({ message: "Hello, World" })\n})\n\nexport default ${name};`;
};
```

## Examples

Generate a controller file from the controller template:

```bash
node index.js create controller
```

```bash
ts-node index.ts create controller
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

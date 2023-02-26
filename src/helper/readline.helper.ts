import { createInterface, Interface } from "readline/promises";

const readline: Interface = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function question<T extends string>(questions: Record<T, string>): Promise<Record<T, string>> {
  const props: {
    [key: string]: string;
  } = {};
  for (const [key, value] of Object.entries(questions)) {
    props[key] = await readline.question(`\x1b[0m${value}\n   \x1b[33m> \x1b[90m`);
  }
  return props as Record<T, string>;
}

export interface ParsedImportSpecifier {
  registry: string;
  scope?: string;
  name: string;
  approximate_version: boolean;
  version: string;
  required: boolean;
}

const requiredModules = [
  "@db/sqlite",
  "@std/cli",
  "@std/http",
  "@std/path",
  "@types/react",
  "@types/react-dom",
  "@webly/editor",
  "@webly/router",
  "autoprefixer",
  "cssnano",
  "lucide-react",
  "postcss",
  "react",
  "react-dom",
  "tailwindcss",
];

export const parseImportSpecifier = (
  specifier: string
): ParsedImportSpecifier | null => {
  // Updated regex to make scope optional
  const regex = /^([\w-]+):(?:@([\w-]+)\/)?([\w-]+)@(\^?)(\d+\.\d+\.\d+)$/;
  const match = specifier.match(regex);

  if (!match) {
    return null;
  }

  const [, registry, scope, name, approximateVersionSymbol, version] = match;

  let required = false;
  if (requiredModules.includes(scope ? `@${scope}/${name}` : name)) {
    required = true;
  }

  return {
    registry,
    ...(scope && { scope }), // Include scope only if it exists
    name,
    approximate_version: approximateVersionSymbol === "^",
    version,
    required,
  };
};

export const compileTailwindCSS = async () => {
  // Compile Tailwind CSS
  const tailwindInputFile = `${Deno.cwd()}/global.css`;
  const tailwindOutputFile = `${Deno.cwd()}/static/global.css`;

  const command = new Deno.Command("deno", {
    args: [
      "run",
      "-A",
      "npm:tailwindcss",
      "-i",
      tailwindInputFile,
      "-o",
      tailwindOutputFile,
      "--minify",
      "--content",
      "./pages/**/*.{js,ts,jsx,tsx}",
    ],
  });

  const output = await command.spawn().output();

  if (output.code !== 0) {
    throw new Error("Failed to compile Tailwind CSS");
  }

  return;
};

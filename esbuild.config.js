import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

const watch = process.argv.includes("--watch");

const buildOptions = {
    entryPoints: ["src/idle-loops-ap.js"],
    outfile: "idle-loops-ap.js",
    bundle: true,
    minify: true,
    target: "es2022",
    plugins: [sassPlugin({ type: "css-text", style: "compressed" })],
};

if (watch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log("Watching for changes...");
} else {
    await esbuild.build(buildOptions);
    console.log("Build complete: idle-loops-ap.js");
}

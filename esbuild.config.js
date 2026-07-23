import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

const watch = process.argv.includes("--watch");

const buildOptions = {
    entryPoints: ["src/idle-loops-ap.js"],
    outfile: "idle-loops-ap.js",
    bundle: true,
    minify: true,
    target: "es2022",
    sourcemap: "linked",
    plugins: [sassPlugin({ type: "css-text", style: "compressed", sourceMap: false })],
};

if (watch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    const { hosts, port } = await ctx.serve({ servedir: ".", port: 8000, cors: { origin: "*" } });
    for (const host of hosts) {
        console.log(`Serving ${host}:${port} - http://${host}:${port}/idle-loops-ap.js`);
    }
} else {
    await esbuild.build(buildOptions);
    console.log("Build complete: idle-loops-ap.js");
}

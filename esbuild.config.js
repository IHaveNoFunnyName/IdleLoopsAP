import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import { copyFileSync, existsSync } from "node:fs";

const watch = process.argv.includes("--watch");

const version = "0.4.2";
const file = "idle-loops-ap";

// Plugin that copies 
function copyPlugin() {
    return {
        name: "copy-output",
        setup(build) {
            build.onEnd(() => {
                copyFileSync(file + '.js', file + '-' + version + '.js');
                if (existsSync(`${file}-${version}.js.map`)) {
                    copyFileSync(`${file}-${version}.js.map`, `${file}.js.map`);
                }
            });
        },
    };
}

const buildOptions = {
    entryPoints: ["src/idle-loops-ap.ts"],
    outfile: file + '.js',
    bundle: true,
    minify: true,
    target: "es2022",
    plugins: [sassPlugin({ type: "css-text", style: "compressed", sourceMap: false }), copyPlugin()],
};

if (watch) {
    buildOptions.sourcemap = "linked";
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    const { hosts, port } = await ctx.serve({ servedir: ".", port: 8000, cors: { origin: "*" } });
    for (const host of hosts) {
        console.log(`Serving ${host}:${port} - http://${host}:${port}/${file}.js`);
    }
} else {
    await esbuild.build(buildOptions);
    console.log(`Build complete: ${file}.js`);
}

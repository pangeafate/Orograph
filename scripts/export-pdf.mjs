import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { access, mkdir, readFile, rm, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";

const rootDir = process.cwd();
const distDir = resolve(rootDir, "dist");

const args = process.argv.slice(2);
const hasFlag = (flag) => args.includes(flag);
const argValue = (flag, fallback = undefined) => {
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : fallback;
};

const outputPath = resolve(rootDir, argValue("--out", "exports/orograph-presentation.pdf"));
const frameDir = resolve(rootDir, argValue("--frames", "exports/pdf-frames"));
const viewport = argValue("--viewport", "1920x1080");
const [viewportWidth, viewportHeight] = viewport.split("x").map((value) => Number.parseInt(value, 10));
const scale = Number.parseFloat(argValue("--scale", "2"));
const slideCountOverride = Number.parseInt(argValue("--slides", ""), 10);

if (!Number.isFinite(viewportWidth) || !Number.isFinite(viewportHeight)) {
  throw new Error("Expected --viewport in WIDTHxHEIGHT format, for example 1920x1080.");
}

if (!Number.isFinite(scale) || scale <= 0) {
  throw new Error("Expected --scale to be a positive number.");
}

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"]
]);

const run = (command, commandArgs) =>
  new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, commandArgs, { cwd: rootDir, stdio: "inherit" });
    child.on("error", rejectRun);
    child.on("exit", (code) => {
      if (code === 0) {
        resolveRun();
      } else {
        rejectRun(new Error(`${command} ${commandArgs.join(" ")} exited with ${code}`));
      }
    });
  });

const isExecutable = async (path) => {
  try {
    await access(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
};

const findOnPath = async (command) => {
  const pathDirs = (process.env.PATH ?? "").split(":").filter(Boolean);
  for (const dir of pathDirs) {
    const candidate = join(dir, command);
    if (await isExecutable(candidate)) return candidate;
  }
  return null;
};

const findChrome = async () => {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (await isExecutable(candidate)) return candidate;
  }

  for (const command of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    const candidate = await findOnPath(command);
    if (candidate) return candidate;
  }

  throw new Error("Chrome/Chromium was not found. Set CHROME_PATH to the browser executable.");
};

const getSlideCount = async () => {
  if (Number.isFinite(slideCountOverride) && slideCountOverride > 0) return slideCountOverride;

  const appSource = await readFile(resolve(rootDir, "src/App.tsx"), "utf8");
  const matches = appSource.match(/^\s*kicker:\s*"/gm) ?? [];
  if (matches.length === 0) {
    throw new Error("Could not infer slide count. Pass --slides N.");
  }
  return matches.length;
};

const createFrameHtml = (slideCount) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Orograph Presentation</title>
    <style>
      @page { size: 16in 9in; margin: 0; }
      * { box-sizing: border-box; }
      html, body { margin: 0; width: 100%; background: #f3f5fa; }
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .page {
        width: 100vw;
        height: 100vh;
        margin: 0;
        overflow: hidden;
        break-after: page;
        page-break-after: always;
        background: #f3f5fa;
      }
      .page:last-child { break-after: auto; page-break-after: auto; }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    </style>
  </head>
  <body>
    ${Array.from({ length: slideCount }, (_, index) => {
      const page = String(index + 1).padStart(2, "0");
      return `<section class="page"><img src="/__frames/slide-${page}.png" alt="Slide ${index + 1}"></section>`;
    }).join("\n    ")}
  </body>
</html>`;

const createStaticServer = async ({ slideCount }) => {
  const frameHtml = createFrameHtml(slideCount);
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");

      if (requestUrl.pathname === "/__pdf.html") {
        response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        response.end(frameHtml);
        return;
      }

      if (requestUrl.pathname.startsWith("/__frames/")) {
        const filePath = resolve(frameDir, requestUrl.pathname.replace("/__frames/", ""));
        const rel = relative(frameDir, filePath);
        if (rel.startsWith("..")) {
          response.writeHead(403);
          response.end("Forbidden");
          return;
        }
        const body = await readFile(filePath);
        response.writeHead(200, { "content-type": "image/png" });
        response.end(body);
        return;
      }

      let pathname = decodeURIComponent(requestUrl.pathname);
      if (pathname === "/") pathname = "/index.html";

      let filePath = resolve(distDir, pathname.slice(1));
      const rel = relative(distDir, filePath);
      if (rel.startsWith("..")) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) filePath = join(filePath, "index.html");

      const body = await readFile(filePath);
      response.writeHead(200, {
        "content-type": mimeTypes.get(extname(filePath)) ?? "application/octet-stream"
      });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });

  await new Promise((resolveListen, rejectListen) => {
    server.on("error", rejectListen);
    server.listen(0, "127.0.0.1", resolveListen);
  });

  return server;
};

if (!hasFlag("--skip-build")) {
  await run("npm", ["run", "build"]);
}

const chrome = await findChrome();
const slideCount = await getSlideCount();

await mkdir(dirname(outputPath), { recursive: true });
await rm(frameDir, { recursive: true, force: true });
await mkdir(frameDir, { recursive: true });

const server = await createStaticServer({ slideCount });
const address = server.address();
const port = typeof address === "object" && address ? address.port : 0;

try {
  for (let slide = 1; slide <= slideCount; slide++) {
    const page = String(slide).padStart(2, "0");
    const screenshotPath = resolve(frameDir, `slide-${page}.png`);
    const url = `http://127.0.0.1:${port}/?capture=1#${slide}`;
    await run(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=3500",
      `--window-size=${viewportWidth},${viewportHeight}`,
      `--force-device-scale-factor=${scale}`,
      `--screenshot=${screenshotPath}`,
      url
    ]);
  }

  await run(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=1000",
    "--no-pdf-header-footer",
    "--print-to-pdf-no-header",
    `--print-to-pdf=${outputPath}`,
    `http://127.0.0.1:${port}/__pdf.html`
  ]);
} finally {
  await new Promise((resolveClose) => server.close(resolveClose));
}

const pdfStat = await stat(outputPath);
console.log(`Exported ${slideCount} screenshot pages to ${outputPath} (${Math.round(pdfStat.size / 1024)} KB)`);

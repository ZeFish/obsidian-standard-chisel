const esbuild = require("esbuild");
const builtins = require("module").builtinModules;
const fs = require("fs");
const path = require("path");

esbuild
  .build({
    entryPoints: ["src/main.js"],
    bundle: true,
    platform: "browser",
    outfile: "main.js",
    external: [
      "obsidian",
      "electron",
      "@electron/remote",
      "@codemirror/autocomplete",
      "@codemirror/collab",
      "@codemirror/commands",
      "@codemirror/language",
      "@codemirror/lint",
      "@codemirror/search",
      "@codemirror/state",
      "@codemirror/view",
      "@lezer/common",
      "@lezer/highlight",
      "@lezer/lr",
      ...builtins,
    ],
    format: "cjs",
    target: "es2020",
    minify: false,
  })
  .then(() => {
    // Bundle CSS
    const featuresDir = path.join(__dirname, "src/features");

    let combinedCss = "";

    if (fs.existsSync(featuresDir)) {
      const features = fs.readdirSync(featuresDir);
      for (const feature of features) {
        const featureDir = path.join(featuresDir, feature);
        if (fs.statSync(featureDir).isDirectory()) {
          const cssFile = path.join(featureDir, "styles.css");
          if (fs.existsSync(cssFile)) {
            combinedCss += `/* --- Feature: ${feature} --- */\n`;
            combinedCss += fs.readFileSync(cssFile, "utf8") + "\n\n";
          }
        }
      }
    }

    const cssPath = path.join(__dirname, "styles.css");
    fs.writeFileSync(cssPath, combinedCss);
    console.log("Built main.js and styles.css");

    // ─── Deploy into the Obsidian vault ──────────────────────────────────────
    const vaultPlugins =
      process.env.VAULT_PLUGINS ||
      path.join(
        require("os").homedir(),
        "Documents",
        "Atelier",
        ".obsidian",
        "plugins",
      );
    const dest = path.join(vaultPlugins, "standard-chisel");
    if (fs.existsSync(vaultPlugins)) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

      // Settings follow the plugin through its renames. This one was "atelier",
      // then "chisel" (taken by another plugin in Obsidian's directory), now
      // "standard-chisel": copy data.json and cache-global.css from the previous
      // folder when the new one does not have them yet. Copies, never moves — the
      // old folder stays until you delete it.
      for (const legacy of ["chisel", "atelier"]) {
        const oldDir = path.join(vaultPlugins, legacy);
        if (!fs.existsSync(oldDir)) continue;
        for (const file of ["data.json", "cache-global.css"]) {
          const from = path.join(oldDir, file);
          const to = path.join(dest, file);
          if (fs.existsSync(from) && !fs.existsSync(to)) {
            fs.copyFileSync(from, to);
            console.log(`Migrated ${file} from ${legacy} to standard-chisel`);
          }
        }
      }

      fs.copyFileSync(path.join(__dirname, "main.js"), path.join(dest, "main.js"));
      fs.copyFileSync(cssPath, path.join(dest, "styles.css"));
      const tray = path.join(__dirname, "trayTemplate.png");
      if (fs.existsSync(tray)) fs.copyFileSync(tray, path.join(dest, "trayTemplate.png"));
      fs.copyFileSync(path.join(__dirname, "manifest.json"), path.join(dest, "manifest.json"));

      const destFonts = path.join(dest, "fonts");
      if (!fs.existsSync(destFonts)) fs.mkdirSync(destFonts, { recursive: true });

      console.log(`Deployed to vault: ${dest}`);
    } else {
      console.log("Vault not found — skipped deploy (set VAULT_PLUGINS to enable).");
    }
  })
  .catch(() => process.exit(1));

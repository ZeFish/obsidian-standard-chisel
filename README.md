# Chisel — Artisan Toolkit for Obsidian

[![Release](https://img.shields.io/github/v/release/ZeFish/obsidian-standard-chisel?include_prereleases&style=flat-square)](https://github.com/ZeFish/obsidian-standard-chisel/releases)
[![Obsidian](https://img.shields.io/badge/Obsidian-v1.6.0+-blue?style=flat-square)](https://obsidian.md)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPLv3-yellow.svg?style=flat-square)](https://www.gnu.org/licenses/gpl-3.0)

Chisel is an artisan companion plugin for Obsidian designed for thoughtful knowledge crafters. It unifies intelligent media handling, font and snippet styling, Zen distraction-free editing, and e-ink display optimizations into a cohesive, modular experience.

---

## Features

Chisel's settings are grouped in four places: **General**, **Reading**, **Writing** and **Vault**. Each feature below is a section in one of them.

### Interface and Zen
*Settings → Chisel → General*

- **Zen** hides the vault name, the file explorer header, the status bar and the tab header when only one tab is open, for a distraction-free canvas.
- **Truncate long filenames** cuts long file and folder names in the explorer with an ellipsis instead of clipping them.
- **Auto-hide sidebars** hides the sidebars and the ribbon until you hover near the edge of the screen.
- **Default reading mode** opens notes in reading view when they say nothing else. Any note can choose its own view with a `mode` property in its frontmatter:
  - `mode: read` opens it in reading view,
  - `mode: edit` opens it in editing view,
  - `mode: source` (or `raw`) opens it in source mode.

  The note's own `mode` always wins over the default. It is applied once, when the note opens, so switching view by hand is never undone.
- **Focus last line on mobile** puts the cursor at the end of a note when it opens on a phone.

### System tray
*Settings → Chisel → General (desktop only)*

Keeps Obsidian running in the background when you close the main window: it hides to the system tray instead of quitting, so your notes and sync keep running. **Hide on launch** starts Obsidian hidden.

### Scroll map
*Settings → Chisel → Reading*

An interactive outline next to the editor scrollbar for moving around a long note. Choose its position, width and opacity, and whether it shows a **map** of the document or a **progress** gauge.

### Base64 fold
*Settings → Chisel → Reading*

Collapses long base64 strings (embedded images, fonts, binary data) into a compact, expandable badge in the editor and in reading view, so notes stay readable without losing the data.

### E-ink and Boox
*Settings → Chisel → Reading*

High-contrast rendering for e-ink displays, with animations and blur disabled. Set it to **auto** (on a detected e-reader), **always**, or **disabled**. On Boox devices it can map the volume, page and arrow keys to scrolling, and adjust typography and layout for grayscale screens.

### Snippets and typography
*Settings → Chisel → Writing*

Write CSS inside a note and have it applied live, without the hidden snippets folder. Chisel reads CSS code blocks from notes, registers them as global or note-scoped stylesheets (with a configurable frontmatter key, and the option to always use `cssclasses`), skips excluded folders, and caches the compiled result for fast startup on desktop and mobile. **Rebuild global cache** recompiles everything.

### Media manager
*Settings → Chisel → Writing*

Tidies attachments as they arrive:
- **Smart rename** turns names like `CleanShot 2026-09-20 at 11.23.45.png` into clean slugs, with a configurable timestamp format. Live editor links update immediately without losing cursor position, even when editing without moving the caret.
- **Storage folder** routes media to a folder, relative to the note (for example `./assets` or `attachments/{note}`) or at the vault root.
- **Only on paste or drop** limits it to media you actively paste or drop into a note, which avoids conflicts with Obsidian Sync.
- **Enable on mobile devices** is off by default, to prevent sync collisions.
- **Aggressive link repair** rewrites unresolved links after a rename. Obsidian already updates links on rename, so leave it off unless you need it.
- Excluded folders are ignored.

### Seedbeds
*Settings → Chisel → Writing*

Writes frontmatter for you. Define a folder and the properties it should have; when a note is created in, or moved to, that folder, Chisel adds those properties without overwriting any key the note already has. The command **Apply seedbed rules to current file** applies them on demand.

### Daily notes navigation
*Settings → Chisel → Writing*

Two floating buttons at the bottom of a daily note to jump to the previous or next one. **Chronological** follows the daily notes that exist; **Calendar** steps through days one by one.

### Live
*Settings → Chisel → Vault*

Opens the public version of the current note in your browser. Set the **base URL** of your site and an optional suffix for notes without a permalink. Use the command **Open public note** or the ribbon icon.

### Echo
*Settings → Chisel → Vault*

Builds dynamic feeds from your log entries. Add the folders to scan (leave one empty to scan the whole vault) and use an `echo` code block in a note to list entries by tag.

### Hollow
*Settings → Chisel → Vault*

Finds hollow notes: notes with nothing under their frontmatter. The command **Find hollow notes** (or the ribbon icon) lists them, and **Delete all** sends them to the system trash. Folders you add to **Excluded folders** are skipped.

---

## 📦 Installation

### Option 1: Obsidian Community Plugins (Recommended)
1. Open **Settings** > **Community plugins** in Obsidian.
2. Ensure **Restricted mode** is turned **off**.
3. Click **Browse** and search for **Chisel**.
4. Click **Install**, then **Enable**.

*(Note: Currently submitted to the community directory. In the meantime, use Option 2 or 3.)*

### Option 2: Via Obsidian BRAT (Beta Reviewers Auto-update Tester)
1. Install and enable the **BRAT** plugin from Community Plugins.
2. In Obsidian, run the command `BRAT: Add a beta plugin for testing`.
3. Enter `ZeFish/obsidian-standard-chisel` and confirm.

### Option 3: Manual Installation
1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release on the [Releases page](https://github.com/ZeFish/obsidian-standard-chisel/releases).
2. Create a folder named `standard-chisel` in your vault's plugins folder: `<vault>/.obsidian/plugins/standard-chisel/`.
3. Copy the downloaded files into that folder.
4. Reload Obsidian and enable **Chisel** in **Settings** > **Community plugins**.

---

## Configuration

Open **Settings → Chisel**. The page opens on **General**; **Reading**, **Writing** and **Vault** are the tabs next to it. Every feature above names the tab it lives in.

---

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/ZeFish/obsidian-standard-chisel.git
cd Chisel

# Install dependencies
pnpm install

# Build the bundle (produces main.js and styles.css)
pnpm run build

# Watch mode during development
pnpm run dev
```

To automatically copy build artifacts to your Obsidian vault during development, define `VAULT_PLUGINS`:

```bash
export VAULT_PLUGINS="/path/to/your/vault/.obsidian/plugins"
pnpm run build
```

---

## 📄 License

Chisel is licensed under the [GNU General Public License v3.0](LICENSE).
Built with craftsmanship by [Utopie](https://utopie.studio).

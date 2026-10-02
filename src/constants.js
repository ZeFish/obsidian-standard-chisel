"use strict";

// Where each feature is documented: the sections of this plugin's README.
const DOCS_BASE = "https://github.com/ZeFish/obsidian-standard-chisel#";
const DOCS = {
  overview: DOCS_BASE + "readme",
  interface: DOCS_BASE + "interface-and-zen",
  media: DOCS_BASE + "media-manager",
  snippets: DOCS_BASE + "snippets-and-typography",
  scrollMap: DOCS_BASE + "scroll-map",
  systemTray: DOCS_BASE + "system-tray",
  base64: DOCS_BASE + "base64-fold",
};

function descWithLinks(text, links = []) {
  const frag = document.createDocumentFragment();
  const parts = text.split("§");
  parts.forEach((part, i) => {
    if (part) frag.appendText(part);
    if (i < links.length) {
      const link = links[i];
      const a = frag.createEl("a", { text: link.text, href: link.href });
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
      a.style.color = "var(--link-color, var(--interactive-accent))";
      a.style.textDecoration = "underline";
      a.style.textUnderlineOffset = "2px";
    }
  });
  return frag;
}

module.exports = { DOCS,
  descWithLinks,
};

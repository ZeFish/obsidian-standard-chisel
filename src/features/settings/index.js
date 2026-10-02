"use strict";

const { PluginSettingTab, Platform } = require("obsidian");

const { LiveSettingTab } = require("../live/index.js");
const { EchoSettingTab } = require("../echo/index.js");
const { HollowSettingTab } = require("../hollow/index.js");
const { SystemTraySettingTab } = require("../system-tray/index.js");
const { MediaManagerSettingTab } = require("../media-manager/index.js");
const { EinkSettingTab } = require("../eink/index.js");
const { ScrollMapSettingTab } = require("../scroll-map/index.js");
const { SnippetManagerSettingTab } = require("../snippet-manager/index.js");
const { DailyNavSettingTab } = require("../daily-nav/index.js");
const { SeedbedsSettingTab } = require("../seedbeds/index.js");
const { InterfaceManagerSettingTab } = require("../interface-manager/index.js");
const { Base64FoldSettingTab } = require("../base64-fold/index.js");

// Twelve features, four places to look. Each section is the feature's own
// settings tab, drawn one under the other inside its group; a section that
// returns null (the tray on mobile, where it does not exist) is skipped.
//
// General comes first and is where the plugin opens: it holds the settings
// everyone reaches for (Zen, truncated filenames, reading mode).
const GROUPS = [
  {
    id: "general",
    label: "General",
    sections: [
      (app, plugin) => new InterfaceManagerSettingTab(app, plugin),
      (app, plugin) => (Platform.isDesktop ? new SystemTraySettingTab(app, plugin) : null),
    ],
  },
  {
    id: "reading",
    label: "Reading",
    sections: [
      (app, plugin) => new ScrollMapSettingTab(app, plugin),
      (app, plugin) => new Base64FoldSettingTab(app, plugin),
      (app, plugin) => new EinkSettingTab(app, plugin),
    ],
  },
  {
    id: "writing",
    label: "Writing",
    sections: [
      (app, plugin) => new SnippetManagerSettingTab(app, plugin),
      (app, plugin) => new MediaManagerSettingTab(app, plugin),
      (app, plugin) => new SeedbedsSettingTab(app, plugin),
      (app, plugin) => new DailyNavSettingTab(app, plugin),
    ],
  },
  {
    id: "vault",
    label: "Vault",
    sections: [
      (app, plugin) => new LiveSettingTab(app, plugin),
      (app, plugin) => new EchoSettingTab(app, plugin),
      (app, plugin) => new HollowSettingTab(app, plugin),
    ],
  },
];

class ChiselSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.currentGroup = GROUPS[0].id;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    const nav = containerEl.createDiv({ cls: "chisel-settings-nav" });
    for (const group of GROUPS) {
      const button = nav.createEl("button", {
        text: group.label,
        cls: group.id === this.currentGroup ? "mod-cta" : "",
      });
      button.addEventListener("click", () => {
        this.currentGroup = group.id;
        this.display();
      });
    }

    const active = GROUPS.find((g) => g.id === this.currentGroup) || GROUPS[0];
    const content = containerEl.createDiv({ cls: "chisel-settings-content" });
    for (const make of active.sections) {
      const tab = make(this.app, this.plugin);
      if (!tab) continue;
      tab.containerEl = content.createDiv({ cls: "chisel-settings-section" });
      tab.display();
    }
  }
}

module.exports = { ChiselSettingTab, GROUPS };

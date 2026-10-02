"use strict";

const { Plugin } = require("obsidian");

const { ChiselSettingTab } = require("./features/settings/index.js");

const { LiveFeature } = require("./features/live/index.js");
const { EchoFeature } = require("./features/echo/index.js");
const { HollowFeature } = require("./features/hollow/index.js");

const {
  SystemTrayFeature,
} = require("./features/system-tray/index.js");
const {
  MediaManagerFeature,
} = require("./features/media-manager/index.js");
const {
  EinkFeature,
} = require("./features/eink/index.js");
const {
  ScrollMapFeature,
} = require("./features/scroll-map/index.js");
const {
  SnippetManagerFeature,
} = require("./features/snippet-manager/index.js");
const {
  DailyNavFeature,
} = require("./features/daily-nav/index.js");
const {
  SeedbedsFeature,
} = require("./features/seedbeds/index.js");
const {
  InterfaceManagerFeature,
} = require("./features/interface-manager/index.js");
const {
  Base64FoldFeature,
} = require("./features/base64-fold/index.js");

class ChiselPlugin extends Plugin {
  async onload() {
    console.log("Chisel plugin loading...");
    this.settings = (await this.loadData()) || {};

    this.features = [
      new LiveFeature(this.app, this),
      new EchoFeature(this.app, this),
      new HollowFeature(this.app, this),
      new SystemTrayFeature(this.app, this),
      new MediaManagerFeature(this.app, this),
      new EinkFeature(this.app, this),
      new ScrollMapFeature(this.app, this),
      new SnippetManagerFeature(this.app, this),
      new DailyNavFeature(this.app, this),
      new SeedbedsFeature(this.app, this),
      new InterfaceManagerFeature(this.app, this),
      new Base64FoldFeature(this.app, this),
    ];

    this.addSettingTab(new ChiselSettingTab(this.app, this));

    for (const feature of this.features) {
      if (feature.load) await feature.load();
    }
  }

  async onunload() {
    for (const feature of this.features) {
      if (feature.unload) await feature.unload();
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

module.exports = ChiselPlugin;

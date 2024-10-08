import {
  initProsemirrorDND5E,
  initProsemirrorDSA5,
} from "./prosemirrorButtons.js";
import { log } from "./helpers.js";

// "init" Hook gets called while initializing the world
Hooks.on("init", () => {
  game.settings.register("studio-vtt-bastler-tools", "activate-css", {
    name: game.i18n.localize(`SVTTB.SETTINGS.activateName`),
    hint: game.i18n.localize(`SVTTB.SETTINGS.activateHint`),
    scope: "client", // "client" => stored per client; "world" => editable by gm for everyone
    config: true, // if true, setting is visible in settings dialog
    type: Boolean,
    default: true,
    onChange: (value) => {
      // value is the new value of the setting
      log("setting changed:", value);
      // reloads and reinitializes world
      foundry.utils.debouncedReload();
    },
  });
  // activate by calling game.settings.set("studio-vtt-bastler-tools", "use-prosemirror-buttons", true)
  game.settings.register(
    "studio-vtt-bastler-tools",
    "use-prosemirror-buttons",
    {
      scope: "world", // "client" => stored per client; "world" => editable by gm for everyone
      config: false, // if true, setting is visible in settings dialog
      type: Boolean,
      default: false,
      onChange: (value) => {
        // value is the new value of the setting
        log(`now${value ? " " : " not "}using prosemirror buttons`);
        // reloads and reinitializes world
        foundry.utils.debouncedReload();
      },
    }
  );

  log("registered settings");
});

// "ready" Hook gets called, when foundry finished initializing the world
Hooks.on("ready", () => {
  // check if setting is active, pass function if not
  if (!game.settings.get("studio-vtt-bastler-tools", "activate-css")) return;

  // check game system
  switch (game.system.id) {
    case "dsa5":
      // add css for dsa5 system
      $("head").append(
        '<link rel="stylesheet" type="text/css" href="modules/studio-vtt-bastler-tools/styles/dsa5.css">'
      );
      log("inserted custom dsa5 styles");

      // init ProseMirror Buttons if enabled
      if (
        game.settings.get("studio-vtt-bastler-tools", "use-prosemirror-buttons")
      )
        initProsemirrorDSA5();

      break;
    case "dnd5e":
      // add css for dnd5e system
      $("head").append(
        '<link rel="stylesheet" type="text/css" href="modules/studio-vtt-bastler-tools/styles/dnd5e.css">'
      );
      log("inserted custom dnd5e styles");

      // init ProseMirror Buttons if enabled
      if (
        game.settings.get("studio-vtt-bastler-tools", "use-prosemirror-buttons")
      )
        initProsemirrorDND5E();
      break;

    default:
      break;
  }
});

Hooks.on("renderJournalSheet", async (_, html) => {
  setTimeout(
    () =>
      html
        .find(".readaloud")
        .attr("readaloud-title", game.i18n.localize("SVTTB.JOURNAL.readaloud")),
    100
  );
});

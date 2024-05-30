import { initProsemirrorDSA5 } from "./prosemirrorButtons.js";

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
      debouncedReload();
    },
  });

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

      // init ProseMirror Buttons
      initProsemirrorDSA5();

      break;
    case "dnd5e":
      // add css for dnd5e system
      $("head").append(
        '<link rel="stylesheet" type="text/css" href="modules/studio-vtt-bastler-tools/styles/dnd5e.css">'
      );
      log("inserted custom dnd5e styles");
      break;

    default:
      break;
  }
});

/**
 * works similar to console.log(), but adds "SVTTB |" prefix for filtering console
 * @param  {...any} o objects to log
 */
export function log(...o) {
  console.log("SVTTB |", ...o);
}

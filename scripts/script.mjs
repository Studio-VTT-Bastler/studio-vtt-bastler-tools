import { CONST } from "./utils/const.mjs"; // CORRECTED PATH
import { log, registerBasicHelpers } from "./lib/helpers.js";
import  CityMapApplication from "./application/apps/citymaps.mjs";
import { initProsemirrorDND5E, initProsemirrorDSA5 } from "./application/journal/prosemirrorButtons.js";
// "init" Hook gets called while initializing the world
Hooks.on("init", async () => { // CORRECTED: Added 'async'
  registerBasicHelpers();
  await loadTemplates([CONST.TEMPLATES.WINDOW]);
  log("Templates and helpers registered.");

  // Register all settings
  game.settings.register(CONST.MODULE_ID, "activate-css", {
    name: game.i18n.localize(`SVTTB.SETTINGS.activateName`),
    hint: game.i18n.localize(`SVTTB.SETTINGS.activateHint`),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => foundry.utils.debouncedReload(),
  });

  game.settings.register(CONST.MODULE_ID, "use-prosemirror-buttons", {
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
    onChange: (value) => {
      log(`now${value ? " " : " not "}using prosemirror buttons`);
      foundry.utils.debouncedReload();
    },
  });

  log("registered settings");
});

// Hook to register the CityMap button.
Hooks.on("getSceneControlButtons", (controls) => {
  if (!game.user.isGM) return;
  const tokenControl = controls["tokens"];
  if (!tokenControl) return;
  if (tokenControl.tools[CONST.MODULE_ID]) return;


  const toolName = `${CONST.MODULE_ID}-city-maps`;

  tokenControl.tools[toolName] = {
    name: toolName,
    title: "City Maps",
    icon: "fas fa-map",
    visible: true,
    toggle: true,
    
    active: Object.values(ui.windows).some(
      (app) => app.id === `${CONST.MODULE_ID}-city-map`
    ),
    
    onChange: (toggled) => {
      const app = Object.values(ui.windows).find(
        (app) => app.id === `${CONST.MODULE_ID}-city-map`
      );
      if (toggled) {
        if (!app) new CityMapApplication().render(true);
      } else {
        if (app) app.close();
      }
    },
  };
})

// "ready" Hook gets called, when foundry finished initializing the world
Hooks.on("ready", () => {
  if (!game.settings.get(CONST.MODULE_ID, "activate-css")) return;

  switch (game.system.id) {
    case "dsa5":
      $("head").append(
        `<link rel="stylesheet" type="text/css" href="modules/${CONST.MODULE_ID}/styles/dsa5.css">`
      );
      log("inserted custom dsa5 styles");
      if (game.settings.get(CONST.MODULE_ID, "use-prosemirror-buttons"))
        initProsemirrorDSA5();
      break;
    case "dnd5e":
      $("head").append(
        `<link rel="stylesheet" type="text/css" href="modules/${CONST.MODULE_ID}/styles/dnd5e.css">`
      );
      log("inserted custom dnd5e styles");
      if (game.settings.get(CONST.MODULE_ID, "use-prosemirror-buttons"))
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

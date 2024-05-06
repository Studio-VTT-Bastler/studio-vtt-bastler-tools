Hooks.on("init", () => {
  game.settings.register("studio-vtt-bastler-tools", "activate-css", {
    name: game.i18n.localize(`SVTTB.SETTINGS.activateName`),
    hint: game.i18n.localize(`SVTTB.SETTINGS.activateHint`),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => { // value is the new value of the setting
      log("setting changed:", value)
      debouncedReload()
    },
  });
  log("registered settings")
});

Hooks.on("ready", () => {
  if (!game.settings.get("studio-vtt-bastler-tools", "activate-css")) return;

  switch (game.system.id) {
    case "dsa5":
      $("head").append(
        '<link rel="stylesheet" type="text/css" href="modules/studio-vtt-bastler-tools/styles/dsa5.css">'
      );
      log("inserted custom dsa5 styles")
      break;
    case "dnd5e":
      $("head").append(
        '<link rel="stylesheet" type="text/css" href="modules/studio-vtt-bastler-tools/styles/dnd5e.css">'
      );
      log("inserted custom dnd5e styles")
      break;

    default:
      break;
  }
});

function log(...s) {
  console.log("SVTTB |", ...s)
}

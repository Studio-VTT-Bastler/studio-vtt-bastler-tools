import { initProsemirrorDSA5 } from "./prosemirrorButtons.js";
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

      /*  The following code serves to observe when gmnotes elements are resized and add the 'narrow' class if the width
          is below a certain threshold, so that the mask can be hidden.
          This is necessary since CSS media queries only observe the viewport width and not the element width.
          Since the gmnotes are created dynamically, we also need to observe the document for changes and add the observer
          to any new elements (e.g. when a journal window is opened).
          NOTE: I noticed that the mutation observer breaks Prosemirror functionality to enter into source code mode. Hence
          I've limited it to normal journal display, while in the editor always the verion without the mask is shown. */

      let handleResize = function(entries) {
        entries.forEach(entry => {
          if (entry.contentRect.width <= 350) {
            entry.target.classList.add('narrow');
          } else {
            entry.target.classList.remove('narrow');
          }
        });
      }

      // Create a ResizeObserver instance with the callback function
      const resizeObserver = new ResizeObserver(handleResize);

      // Function to observe a single element
      let observeElement = function(element) {
        resizeObserver.observe(element);
      }

      // Get all current gmnotes elements and observe them
      document.querySelectorAll('.gmnotes').forEach(observeElement);


      // Create a MutationObserver to observe changes in the DOM
      const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.matches('.journal-sheet-container .gmnotes')) {
              observeElement(node);
            }
            // Also check for any descendants with the .gmnotes class
            node.querySelectorAll?.('.gmnotes').forEach(observeElement);
          });
        });
      });

      // Observe the document body for added nodes
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });

      /* --- end of gmnotes resize observer --- */

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
      break;

    default:
      break;
  }
});

import { log } from "./helpers.js";

/**
 * This Function initializes ProseMirror Buttons for the dsa5 system
 */
export function initProsemirrorDSA5() {
  // "getProseMirrorMenuDropDowns" Hook gets called, when ProseMirror Editor
  // is rendered, to give access to dropdown items
  Hooks.on("getProseMirrorMenuDropDowns", (menu, items) => {
    // retrieve foundry-function for wrapping prosemirror text in html nodes
    const wrapIn = foundry.prosemirror.commands.wrapIn;
    const wrapInList = foundry.prosemirror.list.wrapInList;

    // return if no format is in dropdown
    if (!("format" in items)) return;

    // add item to format dropdown
    items.format.entries.push({
      action: "svttb-styles",
      title: "SVTTB Styles",
      // define child items of "SVTTB Styles"
      children: [
        {
          action: "readaloud",
          title: "Read aloud",
          node: menu.schema.nodes.div,
          attrs: { class: "readaloud" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "readaloud" } },
            });
            return true;
          },
        },
        {
          action: "scenetitle",
          title: "Scene title",
          node: menu.schema.nodes.div,
          attrs: { class: "scenetitle" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "scenetitle" } },
            });
            return true;
          },
        },
        {
          action: "chatpaperfield",
          title: "Chatpaper field",
          node: menu.schema.nodes.div,
          attrs: { class: "scenetitle" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "chatpaperfield" } },
            });
            return true;
          },
        },
        {
          action: "vttblist",
          title: "VTTB List",
          node: menu.schema.nodes.div,
          attrs: { class: "vttblist" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "vttblist" } },
            });
            // use function ProseMirrorMenu._toggleBlock() to additionally wrap whole Block in Bullet List
            // actually would be better to use function wrapInList(), but there is no access in scope
            menu._toggleBlock(menu.schema.nodes.bullet_list, wrapInList);
            return true;
          },
        },
        {
          action: "gmnotes",
          title: "Mask Field",
          node: menu.schema.nodes.div,
          attrs: { class: "gmnotes" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "gmnotes" } },
            });
            return true;
          },
        },

        {
          action: "dsa5-styles",
          title: "DSA5 Styles",
          // define child items of "DSA5 Styles"
          children: [
            {
              action: "maskfield",
              title: "Mask Field",
              node: menu.schema.nodes.div,
              attrs: { class: "maskfield" },
              cmd: () => {
                // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
                menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                  attrs: { _preserve: { class: "maskfield" } },
                });
                return true;
              },
            },
            {
              action: "dsalist",
              title: "DSA List",
              node: menu.schema.nodes.div,
              attrs: { class: "dsalist" },
              cmd: () => {
                // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
                menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                  attrs: { _preserve: { class: "dsalist" } },
                });
                // use function ProseMirrorMenu._toggleBlock() to additionally wrap whole Block in Bullet List
                // actually would be better to use function wrapInList(), but there is no access in scope
                menu._toggleBlock(menu.schema.nodes.bullet_list, wrapInList);
                return true;
              },
            },
          ],
        },
      ],
    });

    log("Added Prosemirror Buttons");
  });
}

/**
 * This Function initializes ProseMirror Buttons for the dnd5e system
 */
export function initProsemirrorDND5E() {
  // "getProseMirrorMenuDropDowns" Hook gets called, when ProseMirror Editor
  // is rendered, to give access to dropdown items
  Hooks.on("getProseMirrorMenuDropDowns", (menu, items) => {
    // retrieve foundry-function for wrapping prosemirror text in html nodes
    const wrapIn = foundry.prosemirror.commands.wrapIn;
    const wrapInList = foundry.prosemirror.list.wrapInList;

    // return if no format is in dropdown
    if (!("format" in items)) return;

    // add item to format dropdown
    items.format.entries.push({
      action: "svttb-styles",
      title: "SVTTB Styles",
      // define child items of "SVTTB Styles"
      children: [
        {
          action: "readaloud",
          title: "Read aloud",
          node: menu.schema.nodes.div,
          attrs: { class: "readaloud" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "readaloud" } },
            });
            return true;
          },
        },
        {
          action: "combat",
          title: "Combat",
          node: menu.schema.nodes.div,
          attrs: { class: "combat" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "combat" } },
            });
            return true;
          },
        },
        {
          action: "gmnotes",
          title: "GM Notes",
          node: menu.schema.nodes.div,
          attrs: { class: "gmnotes" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "gmnotes" } },
            });
            return true;
          },
        },
        {
          action: "treasure",
          title: "Treasure",
          node: menu.schema.nodes.div,
          attrs: { class: "treasure" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "treasure" } },
            });
            return true;
          },
        },
        {
          action: "sceneintro",
          title: "Scene Intro",
          node: menu.schema.nodes.div,
          attrs: { class: "sceneintro" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "sceneintro" } },
            });
            return true;
          },
        },
        {
          action: "boxbrown",
          title: "Brown Box",
          node: menu.schema.nodes.div,
          attrs: { class: "boxbrown" },
          cmd: () => {
            // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
            menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
              attrs: { _preserve: { class: "boxbrown" } },
            });
            return true;
          },
        },
        {
          action: "ah5e",
          title: "Aventurische Helden 5e",
          // define child items of "DSA5 Styles"
          children: [
            {
              action: "section",
              title: "Section",
              node: menu.schema.nodes.div,
              attrs: { class: "av5e" },
              cmd: () => {
                // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
                menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                  attrs: { _preserve: { class: "av5e" } },
                });
                return true;
              },
            },
            {
              action: "paragraph",
              title: "Paragraph",
              node: menu.schema.nodes.div,
              attrs: { class: "av5e" },
              cmd: () => {
                // use function ProseMirrorMenu._toggleBlock() to wrap whole Block in Node
                menu._toggleBlock(menu.schema.nodes.paragraph, wrapIn, {
                  attrs: { _preserve: { class: "av5e" } },
                });
                return true;
              },
            },
          ]
        }
      ],
    });

    log("Added Prosemirror Buttons");
  });
}

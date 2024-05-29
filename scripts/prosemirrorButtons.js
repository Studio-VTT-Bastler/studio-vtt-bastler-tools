import { log } from "./script.js";

export function initProsemirrorDSA5() {
  Hooks.on("getProseMirrorMenuDropDowns", (menu, items) => {
    const wrapIn = ProseMirror.commands.wrapIn;
    log(menu)
    if ("format" in items) {
      items.format.entries.push({
        action: "svttb-styles",
        title: "SVTTB Styles",
        children: [
          {
            action: "readaloud",
            title: "Read aloud",
            node: menu.schema.nodes.div,
            attrs: { class: "readaloud" },
            cmd: () => {
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
              menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                attrs: { _preserve: { class: "scenetitle" } },
              });
              return true;
            },
          },
          {
            action: "dsalist",
            title: "DSA list",
            node: menu.schema.nodes.div,
            attrs: { class: "dsalist" },
            cmd: () => {
              menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                attrs: { _preserve: { class: "dsalist" } },
              });
              menu._toggleBlock(menu.schema.nodes.bullet_list, wrapIn)
              return true;
            },
          },
          {
            action: "vttblist",
            title: "VTTB List",
            node: menu.schema.nodes.div,
            attrs: { class: "vttblist" },
            cmd: () => {
              menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                attrs: { _preserve: { class: "vttblist" } },
              });
              menu._toggleBlock(menu.schema.nodes.bullet_list, wrapIn)
              return true;
            },
          },
          {
            action: "maskfield",
            title: "Mask Field",
            node: menu.schema.nodes.div,
            attrs: { class: "maskfield" },
            cmd: () => {
              menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                attrs: { _preserve: { class: "maskfield" } },
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
              menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                attrs: { _preserve: { class: "gmnotes" } },
              });
              return true;
            },
          },
        ],
      });
    }
  });
}

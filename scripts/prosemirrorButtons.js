export function initProsemirrorDSA5() {
  Hooks.on("getProseMirrorMenuDropDowns", (menu, items) => {
    const wrapIn = ProseMirror.commands.wrapIn;
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
              return true;
            },
          },
          {
            action: "dsalist2",
            title: "Alt. DSA list",
            node: menu.schema.nodes.div,
            attrs: { class: "dsalist2" },
            cmd: () => {
              menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                attrs: { _preserve: { class: "dsalist2" } },
              });
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
            action: "maskfield2",
            title: "Alt. Mask Field",
            node: menu.schema.nodes.div,
            attrs: { class: "maskfield2" },
            cmd: () => {
              menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                attrs: { _preserve: { class: "maskfield2" } },
              });
              return true;
            },
          },
        ],
      });
    }
  });
}

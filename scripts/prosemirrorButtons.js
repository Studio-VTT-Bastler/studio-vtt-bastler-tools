export function initProsemirrorDSA5() {
  Hooks.on("getProseMirrorMenuDropDowns", (menu, items) => {
    const wrapIn = foundry.prosemirror.commands.wrapIn;
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
        ],
      });
    }
  });
}

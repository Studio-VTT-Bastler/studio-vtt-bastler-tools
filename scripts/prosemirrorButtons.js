export var functions = {
  prosemirror: null,
  readaloud: async function () {
    console.log("inserted readaloud");;

    this.prosemirror.view.dispatch(
      this.prosemirror.view.state.tr
        .insertText(`${await navigator.clipboard.readText()}`) //TODO
        .scrollIntoView()
    );
  },
};

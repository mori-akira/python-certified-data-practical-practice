$(() => {
  $(".jp-OutputArea-output").each((_, e) => {
    $(e).click(() => $(e).toggleClass("focused"));
  });
});

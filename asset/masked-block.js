// マスクブロッククリック時のアクションを定義するメソッド
const createMaskBlockAction = () => {
  $("mask-block, m-b").each((_, e) => {
    $(e).click(() => {
      if ($(e).hasClass("clicked")) {
        $(e).removeClass("clicked");
      } else {
        $(e).addClass("clicked");
      }
    });
  });
};

$(() => {
  createMaskBlockAction();
});

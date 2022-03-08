const MAX_COMMENT_LENGTH = 140;

function checkLineLength (text, max) {
  return text.length <= max;
}

checkLineLength('Текст', MAX_COMMENT_LENGTH);

export {checkLineLength};

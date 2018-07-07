/* global window */

/**
 * Returns the position of the caret in terms of its distance from the start
 * of the currently focused element.
 * This function is not cross-browser compatible.
 * @returns {Number}
 */
function getCaretPosition() {
  const range = window.getSelection().getRangeAt(0);
  const selectedObj = window.getSelection();
  let rangeCount = 0;
  /* eslint-disable-next-line */
  const childNodes = selectedObj.anchorNode.parentNode.childNodes;
  for (let i = 0; i < childNodes.length; i += 1) {
    if (childNodes[i] === selectedObj.anchorNode) {
      break;
    }
    if (childNodes[i].outerHTML) rangeCount += childNodes[i].outerHTML.length;
    else if (childNodes[i].nodeType === 3) {
      rangeCount += childNodes[i].textContent.length;
    }
  }
  return range.startOffset + rangeCount;
}


/**
 * A representation of the text caret.
 * Includes class methods to determine whether the user is currently typing a
 * word or not, and the position of the caret relative to the text string it
 * is in.
 */
class Caret {
  constructor(element) {
    this.element = element;
    this.caretPosition = getCaretPosition(element);
    this.currentWord = this.getCurrentWord(this.elementContent(), this.caretPosition);
  }

  /**
   * Abstraction for retrieving the text content of the current element
   */
  elementContent() {
    return this.element.value || this.element.innerText;
  }

  /**
   * The word that the user is currently typing.
   * Note: Some issues exist with leading and trailing spaces.
   */
  getCurrentWord(text, caretPosition) {
    const space = this.getWordBoundary(text, caretPosition);
    return text.slice(space, caretPosition);
  }

  /**
   * Gets the index of leftmost character of
   * the word the user is currently typing.
   */
  getWordBoundary(text, caretPosition) {
    const pointer = caretPosition - 1;
    if (pointer < 0 || text[pointer] === ' ') return pointer + 1;
    return this.getWordBoundary(text, pointer);
  }

  isMidWord() {
    const x = this.elementContent().charAt(this.caretPosition);
    return !!(x && x !== ' ');
  }
}

export default Caret;

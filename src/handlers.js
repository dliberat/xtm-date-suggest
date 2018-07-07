/* global window, document */

import Caret from './Caret';

/**
 * Clicking anywhere on the screen causes
 * the suggestions panel to disappear.
 * @param {*} panel
 */
function clickHandler(panel) {
  panel.hide();
}


function insertSuffix(text, suffix, caret) {
  const pos = caret.caretPosition;
  return text.substr(0, pos) + suffix + text.substr(pos);
}


function replaceElementTextWithAutocompletedText(node, panel, caret) {
  // innerText will usually be the correct choice
  // since XTM uses p elements
  const txtProp = node.value ? 'value' : 'innerText';

  // Since the user has already typed in part of the term,
  // retrieve the remaining part that they haven't yet typed in,
  // then put it into the input element
  const suffix = panel.getSuffix();
  node[txtProp] = insertSuffix(node[txtProp], suffix, caret);
  panel.hide();

  // Reposition the cursor because it gets moved back to position 0 by default
  window.setTimeout(() => {
    const range = document.createRange();
    range.setStart(node.childNodes[0], caret.caretPosition + suffix.length);
    range.collapse(true);

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }, 5);
}


/**
 * Handler for specific keypresses that do not count as "input" into the
 * target text element.
 * Primarily used to preventDefault on the Tab key and insert the
 * suggested text into the element.
 * @param {*} e - Event
 */
function keyDownHandler(e, panel, caret) {
  // Handles user clicking specific keys
  const node = e.currentTarget;

  // Arrow keys
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    panel.hide();
    return;
  }

  // Tab key
  if (e.keyCode === 9 && panel.isVisible()) {
    e.preventDefault();
    replaceElementTextWithAutocompletedText(node, panel, caret);
  }
}


/**
 * Closes any existing panels, then updates the global terms object with the
 * terms found in the source text when a new segment has been focused.
 * TODO: Refactor. Build the entire term list as soon as the page loads, then
 * the inputHandler can simply retrieve the array it needs, and this
 * function can be reduced to just hiding the panel.
 */
function focusHandler(e, panel, termlist) {
  panel.hide();
  const idnum = Number(e.currentTarget.id.slice(7));
  termlist.addSegment(idnum);
  return termlist.getSegmentArray(idnum);
}


// returns the first term of which the current word
// is a partial match. Returns null if no word is matched.
function matchesTerm(word, terms) {
  const escaped = word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const re = new RegExp(`^${escaped}`);

  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i];
    // check for strict equality so that the panel
    // disappears when the entire word has been written
    if (re.test(term) && word !== term) return term;
  }
  return null;
}


function autocompletePopup(element, terms, currentWord, panel) {
  if (currentWord.length > 0) {
    const matchedTerm = matchesTerm(currentWord, terms);
    if (matchedTerm) {
      panel.foundTerm(element, currentWord, matchedTerm);
    } else {
      panel.hide();
    }
  }
}


/**
 * Handles user input of text into an element.
 * @param {*} e - Input event
 */
function inputHandler(e, panel, caret, terms) {
  // Close the popup and short-circuit if deleting the last character
  const elementContent = e.currentTarget.value || e.currentTarget.innerText;
  if (!elementContent) {
    panel.hide();
    return caret;
  }

  // Track the position of the caret and the current word being typed
  /* eslint-disable-next-line */
  caret = new Caret(e.currentTarget);

  // Check if the user is currently in between two letters,
  // indicating that they are editing a word and thus do
  // not need autocomplete suggestions
  if (!caret.isMidWord() && caret.currentWord.length > 0) {
    autocompletePopup(e.currentTarget, terms, caret.currentWord, panel);
  } else if (caret.currentWord.length < 1) {
    panel.hide();
  }

  return caret;
}


export {
  clickHandler,
  focusHandler,
  inputHandler,
  keyDownHandler,
};

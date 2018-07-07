/* global window, document */

import Panel from './Panel';
import TermList from './TermList';
import {
  clickHandler,
  focusHandler,
  inputHandler,
  keyDownHandler,
} from './handlers';
import {
  basicShortMonth,
  basicLongMonth,
  shortMonthAMPM,
  } from './DateFormats';

/**
 * Stores the terms that can appear as suggestions in the pop-up div.
 * This is scoped as a module-level variable so that we don't need to
 * re-process each segment's source text every time we enter a new segment.
 * @example
 * termlist.terms = {
 *   0: ['July 3', '7/3'],
 *   1: [],
 *   2: ['12:30, July 4', '7/3 12:30']
 * }
 */
let termlist = new TermList(basicShortMonth);


/**
 * Container for a div element that will be used to display the
 * autocomplete suggestions.
 */
const panel = new Panel();


/**
 * List of suggestions to display when inputting text into an element.
 */
let terms = [];

/**
 * The position of the text caret is tracked with every input into a
 * target text element. It is scoped here because it needs to be shared
 * with the keyDownHandler so the Tab key can perform the autocomplete.
 */
let caret;


/**
 * Returns the depth of the current frame relative to window.top
 * @param {object} winToID - Window element whose depth is to be calculated
 */
// eslint-disable-next-line no-unused-vars
function getFrameDepth(winToID) {
  return winToID === window.top ? 0 : 1 + getFrameDepth(winToID.parent);
}


function main() {
  const inputs = document.querySelectorAll('td [id^="content"]');
  inputs.forEach((input) => {
    input.addEventListener('focus', (e) => { terms = focusHandler(e, panel, termlist); });
    input.addEventListener('click', () => clickHandler(panel));
    input.addEventListener('input', (e) => { caret = inputHandler(e, panel, caret, terms); });
    input.addEventListener('keydown', e => keyDownHandler(e, panel, caret));
  });
}


function changeHandler(e) {
  const selected = e.target.value;
  switch (selected) {
    case 'basicShortMonth':
      termlist = new TermList(basicShortMonth);
      break;
    case 'basicLongMonth':
      termlist = new TermList(basicLongMonth);
      break;
    case 'shortMonthAMPM':
      termlist = new TermList(shortMonthAMPM);
      break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // For XTM
  // if(getFrameDepth (window.self) === 2) main();

  // For development
  const dropdown = document.getElementById('dropdown');
  dropdown.addEventListener('change', changeHandler);
  main();
});

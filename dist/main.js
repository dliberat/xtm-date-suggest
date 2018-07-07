/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Caret.js":
/*!**********************!*\
  !*** ./src/Caret.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Caret);


/***/ }),

/***/ "./src/DateFormats.js":
/*!****************************!*\
  !*** ./src/DateFormats.js ***!
  \****************************/
/*! exports provided: basicShortMonth, basicLongMonth, shortMonthAMPM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basicShortMonth", function() { return basicShortMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basicLongMonth", function() { return basicLongMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shortMonthAMPM", function() { return shortMonthAMPM; });
/**
 * Base interface that date format objects need to implement.
 * The rest of this file shows some examples of how the regex matches
 * can be manipulated to generate different outputs.
 */
class IDateFormat {
  /**
   * Callback function to a string.replace function.
   * Recieves an arbitrary set of arguments depending on how many
   * submatches were found in the target string.
   * @param {string} match - String matching the regex pattern.
   * This will have the form {2018-9-21} for dates, and {2019-9-21 23:59}
   * for dates with times.
   * @returns {string} Text to display as an autocomplete suggestion
   */
  replacer(match, ...submatches) {
    return '';
  }
}

class BasicShortMonth extends IDateFormat {
  constructor() {
    super();
    this.dateAndTime = 'hh:mm, MM DD';
    this.dateOnly = 'MM DD';
    this.months = {
      1: 'Jan.',
      2: 'Feb.',
      3: 'Mar.',
      4: 'Apr.',
      5: 'Mar.',
      6: 'Jun.',
      7: 'Jul.',
      8: 'Aug.',
      9: 'Sep.',
      10: 'Oct.',
      11: 'Nov.',
      12: 'Dec.',
    };
  }

  replacer(match, ...submatches) {
    const includesTime = match.length > 11;
    if (includesTime) {
      return this.replaceDateTime(submatches);
    }
    return this.replaceDateOnly(submatches);
  }

  replaceDateOnly(submatches) {
    const [, month, day] = submatches;
    return this.dateOnly
      .replace('MM', this.months[month])
      .replace('DD', day);
  }

  replaceDateTime(submatches) {
    const [, month, day, hr, min] = submatches;
    return this.dateAndTime
      .replace('MM', this.months[month])
      .replace('DD', day)
      .replace('hh', hr)
      .replace('mm', min);
  }
}

class BasicLongMonth extends BasicShortMonth {
  constructor() {
    super();
    this.months = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'March',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };
  }
}

class ShortMonthAMPM extends BasicShortMonth {
  constructor() {
    super();
    this.dateAndTime = 'hh:mmPP, MM DD';
  }

  replaceDateTime(submatches) {
    const [, month, day, hr, min] = submatches;

    let ampm = 'am';
    let hour = parseInt(hr, 10);
    if (hour > 11) {
      hour -= 12;
      ampm = 'pm';
    }

    return this.dateAndTime
      .replace('MM', this.months[month])
      .replace('DD', day)
      .replace('hh', hour.toString())
      .replace('mm', min)
      .replace('PP', ampm);
  }
}

const basicShortMonth = new BasicShortMonth();
const basicLongMonth = new BasicLongMonth();
const shortMonthAMPM = new ShortMonthAMPM();




/***/ }),

/***/ "./src/Panel.js":
/*!**********************!*\
  !*** ./src/Panel.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* global window, document */

function getSelectionCoords() {
  let x = 0;
  let y = 0;

  const sel = window.getSelection();
  if (sel.rangeCount) {
    const range = sel.getRangeAt(0).cloneRange();
    if (range.getClientRects) {
      range.collapse(true);
      if (range.getClientRects().length > 0) {
        const rect = range.getClientRects()[0];
        x = rect.left;
        y = rect.top;
      }
    }

    // Fall back to inserting a temporary element
    if (x === 0 && y === 0) {
      const span = document.createElement('span');
      if (span.getClientRects) {
        // Ensure span has dimensions and position by
        // adding a zero-width space character
        span.appendChild(document.createTextNode('\u200b'));
        range.insertNode(span);
        const rect = span.getClientRects()[0];
        x = rect.left;
        y = rect.top;
        const spanParent = span.parentNode;
        spanParent.removeChild(span);

        // Glue any broken text nodes back together
        spanParent.normalize();
      }
    }
  }
  return { x, y };
}


/**
 * Generates a span element that itself contains two spans.
 * The prefix and suffix portions of the text get different
 * class names so that the user can receive visual feedback
 * as they type.
 * @param {string} prefix - Substring of the suggestion text
 * that the user has already typed into the input element.
 * @param {string} suffix - Substring of the suggestion text
 * that the user has not yet typed into the input element.
 */
function generateInnerNodes(prefix, suffix) {
  const pre = document.createElement('span');
  pre.classList.add('autocomplete-prefix');
  pre.innerText = prefix;

  const suf = document.createElement('span');
  suf.classList.add('autocomplete-suffix');
  suf.innerText = suffix;

  const span = document.createElement('span');
  span.appendChild(pre);
  span.appendChild(suf);
  return span;
}


// the div that will contain the term info
class Panel {
  constructor() {
    this.panel = document.createElement('div');
    this.panel.classList.add('autocomplete-panel');
    this.panel.id = 'dates-autocomplete-popup';
    document.body.appendChild(this.panel);

    this.currentSuffix;
  }

  foundTerm(element, currentWord, term) {
    // Get the suffix from the term
    const suffix = this.setSuffix(currentWord, term);

    // place the appropriate text in the div
    const span = generateInnerNodes(currentWord, suffix);
    this.panel.innerHTML = '';
    this.panel.appendChild(span);

    // If the panel is not yet rendered, set the location.
    // Don't move the panel if the user is in the middle of typing a word
    if (!this.isVisible()) this.setPanelPosition(currentWord);

    this.panel.style.display = 'block';

    document.addEventListener('click', () => this.hide());
  }

  hide() {
    document.removeEventListener('click', () => this.hide());
    this.panel.style.display = 'none';
  }

  isVisible() {
    return this.panel.style.display !== 'none';
  }

  setSuffix(currentWord, term) {
    this.currentSuffix = term.slice(currentWord.length);
    return this.currentSuffix;
  }

  /**
   * Public interface for the suffix.
   */
  getSuffix() {
    return this.currentSuffix;
  }

  /**
   * Positions the panel above the cursor.
   * Provides a small left offset of a size relative to the length of
   * the prefix. Since the position is only calculated when the panel
   * is first made visible (and not on subsequent input), this offset
   * will usually be negligible. However, it makes for a nicer display
   * when going back to complete a term that was only partially typed
   * in but not completed.
   *
   * It might be better to calculate offsets based on computed styles
   * etc., but these basic values work reasonably well for the default
   * XTM display.
   *
   * @param {string} prefix - Substring of the current term that the
   * user has already typed into the text entry element
   */
  setPanelPosition(prefix) {
    // x and y positions of the text cursor
    const { x, y } = getSelectionCoords();
    const newx = x - prefix.length * 4;
    const newy = y - 35;
    this.panel.style.top = `${newy}px`;
    this.panel.style.left = `${newx}px`;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Panel);


/***/ }),

/***/ "./src/TermList.js":
/*!*************************!*\
  !*** ./src/TermList.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parseDates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseDates */ "./src/parseDates.js");
/* global document */



class TermList {
  constructor(format) {
    this.list = {};
    this.dateFormat = format;
  }

  // Get dates from the source text
  addSegment(segmentNum) {
    // Since the source text does not change dynamically, we don't need to re-process
    // a segment after it has been parsed and added to the list
    if (this.list[segmentNum]) return;

    // grab a reference to the source text that corresponds to the
    // chosen segment and parse the text to find what dates are inside
    const src = document.getElementById(`sourceContent${segmentNum}`);
    const dates = Object(_parseDates__WEBPACK_IMPORTED_MODULE_0__["default"])(src.innerText);

    dates
      .map((x) => this.dateFormatter(x))
      .forEach((date) => { this.addTerm(segmentNum, date); });
  }

  // Adds a single term to the term array
  addTerm(segmentNum, term) {
    // Ensure that a dictionary entry exists for the segment number
    if (!this.list[segmentNum]) this.list[segmentNum] = [];

    // Avoid duplicate entries
    if (this.list[segmentNum].indexOf(term) === -1) this.list[segmentNum].push(term);
  }

  dateFormatter(d) {
    // Closure
    const r = (...args) => this.dateFormat.replacer(...args);
    return d.replace(/{(\d{4})-([0-2]?[0-9])-([1-3]?[0-9])(?: ([0-2]?[0-9]):([0-5][0-9]))?}/, r);
  }


  // Returns the array for a given segment (empty array if none exists)
  getSegmentArray(num) {
    return this.list[num] || [];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TermList);


/***/ }),

/***/ "./src/handlers.js":
/*!*************************!*\
  !*** ./src/handlers.js ***!
  \*************************/
/*! exports provided: clickHandler, focusHandler, inputHandler, keyDownHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clickHandler", function() { return clickHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focusHandler", function() { return focusHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputHandler", function() { return inputHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyDownHandler", function() { return keyDownHandler; });
/* harmony import */ var _Caret__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Caret */ "./src/Caret.js");
/* global window, document */



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
  caret = new _Caret__WEBPACK_IMPORTED_MODULE_0__["default"](e.currentTarget);

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





/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Panel */ "./src/Panel.js");
/* harmony import */ var _TermList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TermList */ "./src/TermList.js");
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlers */ "./src/handlers.js");
/* harmony import */ var _DateFormats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DateFormats */ "./src/DateFormats.js");
/* global window, document */






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
let termlist = new _TermList__WEBPACK_IMPORTED_MODULE_1__["default"](_DateFormats__WEBPACK_IMPORTED_MODULE_3__["basicShortMonth"]);


/**
 * Container for a div element that will be used to display the
 * autocomplete suggestions.
 */
const panel = new _Panel__WEBPACK_IMPORTED_MODULE_0__["default"]();


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
    input.addEventListener('focus', (e) => { terms = Object(_handlers__WEBPACK_IMPORTED_MODULE_2__["focusHandler"])(e, panel, termlist); });
    input.addEventListener('click', () => Object(_handlers__WEBPACK_IMPORTED_MODULE_2__["clickHandler"])(panel));
    input.addEventListener('input', (e) => { caret = Object(_handlers__WEBPACK_IMPORTED_MODULE_2__["inputHandler"])(e, panel, caret, terms); });
    input.addEventListener('keydown', e => Object(_handlers__WEBPACK_IMPORTED_MODULE_2__["keyDownHandler"])(e, panel, caret));
  });
}


function changeHandler(e) {
  const selected = e.target.value;
  switch (selected) {
    case 'basicShortMonth':
      termlist = new _TermList__WEBPACK_IMPORTED_MODULE_1__["default"](_DateFormats__WEBPACK_IMPORTED_MODULE_3__["basicShortMonth"]);
      break;
    case 'basicLongMonth':
      termlist = new _TermList__WEBPACK_IMPORTED_MODULE_1__["default"](_DateFormats__WEBPACK_IMPORTED_MODULE_3__["basicLongMonth"]);
      break;
    case 'shortMonthAMPM':
      termlist = new _TermList__WEBPACK_IMPORTED_MODULE_1__["default"](_DateFormats__WEBPACK_IMPORTED_MODULE_3__["shortMonthAMPM"]);
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


/***/ }),

/***/ "./src/parseDates.js":
/*!***************************!*\
  !*** ./src/parseDates.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const now = new Date();
const thisYear = now.getFullYear();
const thisMonth = now.getMonth() + 1;

const oDateFormats = [
  ['([0-9]{4})\\u5E74([0-1]?[0-9])\\u6708([0-3]?[0-9])\\u65E5\\s?([0-2]?[0-9][\\u6642\\uFF1A:][0-5][0-9]\\uFF5E[0-2]?[0-9][\\u6642\\uFF1A:][0-5][0-9])', '{$1-$2-$3} $4'], // 2017年9月10日10時３０~11:30
  ['([0-9]{4})\\u5E74([0-1]?[0-9])\\u6708([0-3]?[0-9])\\u65E5\\s?([0-2]?[0-9])[\\u6642\\uFF1A:]([0-5][0-9])', '{$1-$2-$3 $4:$5}'], // 2017年9月10日10時３０分
  ['([0-9]{4})/([0-1]?[0-9])/([0-3]?[0-9])', '{$1-$2-$3}'], // 2017/9/1
  ['([0-1]?[0-9])\\u6708([0-3]?[0-9])\\u65E5\\s?([0-2]?[0-9])[\\u6642\\uFF1A:]([0-5][0-9])', `{${thisYear}-$1-$2 $3:$4}`], // 9月10日10時３０分
  ['([0-1]?[0-9])\\u6708([0-3]?[0-9])\\u65E5\\s?([0-2]?[0-9])\\u6642', `{${thisYear}-$1-$2 $3:00}`], // 9月10日10時
  ['([0-1]?[0-9])\\u6708([0-3]?[0-9])\\u65E5\\s?\\u306E([0-2]?[0-9])\\u6642', `{${thisYear}-$1-$2 $3:00}`], // 9月10日の10時
  ['([0-9]{4})\\u5E74([0-1]?[0-9])\\u6708([0-3]?[0-9])\\u65E5', '{$1-$2-$3}'], // 2017年9月10日
  ['([0-9]{4})\\.([0-1]?[0-9])\\.([0-3]?[0-9])', '{$1-$2-$3}'], // 2017.9.10
  ['([0-2]?[0-9])[:\\uFF1A]([0-5][0-9]) ([0-1]?[0-9])\\/([0-3]?[0-9])', `{${thisYear}-$3-$4 $1:$2}`], // 21:59 09/10
  ['([0-1]?[0-9])\\/([0-3]?[0-9]).([0-2]?[0-9])[:\\uFF1A]([0-5][0-9])', `{${thisYear}-$1-$2 $3:$4}`], // 09/10 21:59
  ['([0-1]?[0-9])\\u6708([0-3]?[0-9])\\u65E5', `{${thisYear}-$1-$2}`], // 9月10日
  ['[0-2]?[0-9]:[0-5][0-9]\\s?[-–\\uFF5E]\\s?([0-1]?[0-9])\\/([0-3]?[0-9]) ([0-2]?[0-9]:[0-5][0-9])', `{${thisYear}-$1-$2 $3}`], // 11:00 - 10/29 23:59 (bubble calendar)
  ['([0-1]?[0-9])\\/([0-3]?[0-9])[（(][\\u65E5\\u6708火水木金土][）)]', `{${thisYear}-$1-$2}`], // 9/21（土）
  ['([0-1]?[0-9])\\/([0-3]?[0-9])[\\u304B\\u307E][\\u3089\\u3067]', `{${thisYear}-$1-$2}`], // 9/21から 9/31まで
  ['([0-3]?[0-9])\\u65E5', `{${thisYear}-${thisMonth}-$1}`], // 10日
];


/**
 * Iterates over an array and applies all the replacements indicated
 * in the constituent arrays.
 * @param {*[]} formatChangesArr - Array of substrings to replace
 * @param {string} str - The string to modify
 * @param {string} params - RegExp flags. Defaults to 'gi'.
 */
function replaceAllFromArray(formatChangesArr, str, parameters) {
  let string = str;

  formatChangesArr.forEach((e) => {
    const re = new RegExp(e[0], parameters);
    string = string.replace(re, e[1]);
  });

  return string;
}


/**
 * Remove words from the JP that have kanji in them that would normally be
 * mistaken for dates/times, or that should never be translated as dates/times.
 * @param {string} string - The text to replace
*/
function initialJPFilter(string) {
  const arr = [
    ['([0-9]?[0-9])[\\u65E5\\u6642\\u5206][\\u9593\\u76EE]', ' $1 '], // 3日目,4日間,3時間,25分間
    ['([0-9]+)\\u65E5\\u9023\\u7D9A', ' $1 '], // 6日連続
    ['[0-9]\\u65E5([0-9]+)\\u56DE', ' $1 '], // 1日１回
  ];

  return replaceAllFromArray(arr, string, 'gi');
}


function replaceKanjiNums(s) {
  return s
    .replace(/\u5341\u4E00/g, '11')
    .replace(/\u5341\u4E8C/g, '12')
    .replace(/\u5341\u4E09/g, '13')
    .replace(/\u5341\u56DB/g, '14')
    .replace(/\u5341\u4E94/g, '15')
    .replace(/\u5341\u516D/g, '16')
    .replace(/\u5341\u4E03/g, '17')
    .replace(/\u5341\u516B/g, '18')
    .replace(/\u5341\u4E5D/g, '19')
    .replace(/\u4E8C\u5341/g, '20')
    .replace(/\uFF12|\u4E8C/g, '2')
    .replace(/\uFF13|\u4E09/g, '3')
    .replace(/\uFF14|\u56DB/g, '4')
    .replace(/\uFF15|\u4E94/g, '5')
    .replace(/\uFF16|\u516D/g, '6')
    .replace(/\uFF17|\u4E03/g, '7')
    .replace(/\uFF18|\u516B/g, '8')
    .replace(/\uFF19|\u4E5D/g, '9');
}


function cleanStringsBeforeDateCheck(src) {
  let source = src;

  // replace all double-byte numbers with single byte versions
  source = replaceKanjiNums(source);
  // remove strings that should never be interpreted as numbers
  source = initialJPFilter(source);
  // parse all dates into the {2017-9-21} format
  // Still need to convert things into 2-digit format
  source = replaceAllFromArray(oDateFormats, source, 'gi');

  return source;
}


/** Returns an array of all the matches to the given regex.
 * If passed an initial array, it returns it with the new
 * matches tacked on at the end
 * NOTE: This function currently appears to fail with literal
 * regex constructors.
 * @param {string} str - The string to search
 * @param {RegExp} regex - The regular expression to execute
 * @param {array} accumulatorArr - Adds the matches to the array provided
 * @returns An array of matches found.
 */
function matchToArray(str, regex, accumulatorArr = []) {
  let m;
  do {
    m = regex.exec(str);
    if (m) { accumulatorArr.push(m); }
  } while (m);
  return accumulatorArr;
}


/**
 * Extracts dates in a specified format from two strings, and compares the results.
 * The dates must appear in the form {XXXX-XX-XX} or {XXXX-XX-XX HH:MM}. Months can be
 * single- or double-digits.
 * @param {string} cleanSource - Segment text with natural text dates converted into bracket format.
 * @param {string} cleanTarget - Segment text with natural text dates converted into bracket format.
 * @returns {*} The 0th element in the array is the regex matches from the source text.
 * The 1st element in the array is the regex matches from the target text.
 * The 2nd element in the array is a boolean indicating whether the two arrays are identical or not.
 */
function extractDates(source) {
  const s = '{[0-9]{4}-[0-1]?[0-9]-[0-3]?[0-9]}|{[0-9]{4}-[0-1]?[0-9]-[0-3]?[0-9] [0-2]?[0-9]:[0-5][0-9][ap]?[m]?}';
  const re = new RegExp(s, 'gi');

  /* Perform the RegExp.exec to get the matches
  .map discards all the metadata and only leaves the matches */
  return matchToArray(source, re).map(x => x[0]);
}


/**
 * Convert 12 hour clocks to 24 hour clocks.
 * @param {*} match - RegExp match object
 * @param {Number} hour
 * @param {Number} minutes
 * @param {string} meridian - am' or 'pm', or an empty string.
 * @private
 */
function twentyFourHours(match, hour, minutes, meridian = '') {
  let hr = Number(hour);
  const min = Number(minutes);
  const mer = meridian.toLowerCase();

  if (hr === 12 && mer === 'am') {
    hr = 0;
  }
  if (hr < 12 && mer === 'pm') {
    hr += 12;
  }

  let sHr = hr.toString();
  let sMin = min.toString();

  if (hr < 10) { sHr = `0${sHr}`; }
  if (min < 10) { sMin = `0${sMin}`; }

  return `${sHr}:${sMin}`;
}


/**
 * Converts times in the text from 12 hour format into 24 hour format,
 * accounting for "am/pm" immediately following the time display.
 * @param {string} string - Text containing times
 * @returns A new string with the times replaced
 * @private
 */
function convertToTwentyFourHourClock(s) {
  return s.replace(/([0-2]?[0-9]):([0-5][0-9])([ap]m)?/gi, twentyFourHours);
}


/**
 * Pipes a string through a series of transformations and filters
 * to reduce it down to an array of dates in the {2018-09-21} format
 * @param {string} text - the text to parse
 */
function parseDates(text) {
  const cleaned = cleanStringsBeforeDateCheck(text);
  const extracted = extractDates(cleaned);
  const isoformatted = extracted.map(convertToTwentyFourHourClock);
  return isoformatted;
}

/* harmony default export */ __webpack_exports__["default"] = (parseDates);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhcmV0LmpzIiwid2VicGFjazovLy8uL3NyYy9EYXRlRm9ybWF0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Rlcm1MaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnNlRGF0ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDeEVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsOEJBQThCLFVBQVUsaUJBQWlCO0FBQ3pEO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBTUE7Ozs7Ozs7Ozs7Ozs7QUN2SEE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0EsOEJBQThCLEtBQUs7QUFDbkMsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUMvSUE7QUFBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF3RCxXQUFXO0FBQ25FOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsZ0NBQWdDLEVBQUU7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixJQUFJLEVBQUUsOERBQThEO0FBQzNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREE7QUFBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLDRCQUE0QixRQUFROztBQUVwQyxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25KQTtBQUFBOztBQUVBO0FBQ0E7QUFNQztBQUtFOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyw0RkFBMEMsRUFBRTtBQUN4RjtBQUNBLDRDQUE0QyxnR0FBOEMsRUFBRTtBQUM1RjtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDOUZEO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxFQUFFLDhJQUE4SSxTQUFTO0FBQ3BLLFdBQVcsRUFBRSxtR0FBbUcsZUFBZTtBQUMvSCxXQUFXLEVBQUUsa0NBQWtDLFNBQVM7QUFDeEQsK0ZBQStGLEVBQUUsU0FBUyxhQUFhO0FBQ3ZILHlFQUF5RSxFQUFFLFNBQVMsYUFBYTtBQUNqRyxnRkFBZ0YsRUFBRSxTQUFTLGFBQWE7QUFDeEcsV0FBVyxFQUFFLHFEQUFxRCxTQUFTO0FBQzNFLFdBQVcsRUFBRSxzQ0FBc0MsU0FBUztBQUM1RCwwRUFBMEUsRUFBRSxTQUFTLGFBQWE7QUFDbEcsMEVBQTBFLEVBQUUsU0FBUyxhQUFhO0FBQ2xHLGlEQUFpRCxFQUFFLFNBQVMsT0FBTztBQUNuRSx3R0FBd0csRUFBRSxTQUFTLFVBQVU7QUFDN0gsbUVBQW1FLEVBQUUsU0FBUyxPQUFPO0FBQ3JGLHNFQUFzRSxFQUFFLFNBQVMsT0FBTztBQUN4Riw2QkFBNkIsRUFBRSxTQUFTLEdBQUcsVUFBVSxJQUFJO0FBQ3pEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLElBQUk7QUFDZixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsVUFBVTtBQUN6QztBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHdCQUF3QjtBQUNwQyxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHNDQUFzQyxXQUFXLEtBQUssaUJBQWlCO0FBQ3ZFO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLEVBQUU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsTUFBTSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sRUFBRSx5REFBeUQ7QUFDbEg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCLFdBQVcsSUFBSSxFQUFFO0FBQ2pDLGlCQUFpQixZQUFZLEtBQUssRUFBRTs7QUFFcEMsWUFBWSxJQUFJLEdBQUcsS0FBSztBQUN4Qjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLGtEQUFrRCxXQUFXO0FBQzdELFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvKiBnbG9iYWwgd2luZG93ICovXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGNhcmV0IGluIHRlcm1zIG9mIGl0cyBkaXN0YW5jZSBmcm9tIHRoZSBzdGFydFxuICogb2YgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnQuXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIG5vdCBjcm9zcy1icm93c2VyIGNvbXBhdGlibGUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXRDYXJldFBvc2l0aW9uKCkge1xuICBjb25zdCByYW5nZSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApO1xuICBjb25zdCBzZWxlY3RlZE9iaiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgbGV0IHJhbmdlQ291bnQgPSAwO1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgY29uc3QgY2hpbGROb2RlcyA9IHNlbGVjdGVkT2JqLmFuY2hvck5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoY2hpbGROb2Rlc1tpXSA9PT0gc2VsZWN0ZWRPYmouYW5jaG9yTm9kZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChjaGlsZE5vZGVzW2ldLm91dGVySFRNTCkgcmFuZ2VDb3VudCArPSBjaGlsZE5vZGVzW2ldLm91dGVySFRNTC5sZW5ndGg7XG4gICAgZWxzZSBpZiAoY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgcmFuZ2VDb3VudCArPSBjaGlsZE5vZGVzW2ldLnRleHRDb250ZW50Lmxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJhbmdlLnN0YXJ0T2Zmc2V0ICsgcmFuZ2VDb3VudDtcbn1cblxuXG4vKipcbiAqIEEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRleHQgY2FyZXQuXG4gKiBJbmNsdWRlcyBjbGFzcyBtZXRob2RzIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSB1c2VyIGlzIGN1cnJlbnRseSB0eXBpbmcgYVxuICogd29yZCBvciBub3QsIGFuZCB0aGUgcG9zaXRpb24gb2YgdGhlIGNhcmV0IHJlbGF0aXZlIHRvIHRoZSB0ZXh0IHN0cmluZyBpdFxuICogaXMgaW4uXG4gKi9cbmNsYXNzIENhcmV0IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5jYXJldFBvc2l0aW9uID0gZ2V0Q2FyZXRQb3NpdGlvbihlbGVtZW50KTtcbiAgICB0aGlzLmN1cnJlbnRXb3JkID0gdGhpcy5nZXRDdXJyZW50V29yZCh0aGlzLmVsZW1lbnRDb250ZW50KCksIHRoaXMuY2FyZXRQb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQWJzdHJhY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIHRleHQgY29udGVudCBvZiB0aGUgY3VycmVudCBlbGVtZW50XG4gICAqL1xuICBlbGVtZW50Q29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LnZhbHVlIHx8IHRoaXMuZWxlbWVudC5pbm5lclRleHQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHdvcmQgdGhhdCB0aGUgdXNlciBpcyBjdXJyZW50bHkgdHlwaW5nLlxuICAgKiBOb3RlOiBTb21lIGlzc3VlcyBleGlzdCB3aXRoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlcy5cbiAgICovXG4gIGdldEN1cnJlbnRXb3JkKHRleHQsIGNhcmV0UG9zaXRpb24pIHtcbiAgICBjb25zdCBzcGFjZSA9IHRoaXMuZ2V0V29yZEJvdW5kYXJ5KHRleHQsIGNhcmV0UG9zaXRpb24pO1xuICAgIHJldHVybiB0ZXh0LnNsaWNlKHNwYWNlLCBjYXJldFBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBpbmRleCBvZiBsZWZ0bW9zdCBjaGFyYWN0ZXIgb2ZcbiAgICogdGhlIHdvcmQgdGhlIHVzZXIgaXMgY3VycmVudGx5IHR5cGluZy5cbiAgICovXG4gIGdldFdvcmRCb3VuZGFyeSh0ZXh0LCBjYXJldFBvc2l0aW9uKSB7XG4gICAgY29uc3QgcG9pbnRlciA9IGNhcmV0UG9zaXRpb24gLSAxO1xuICAgIGlmIChwb2ludGVyIDwgMCB8fCB0ZXh0W3BvaW50ZXJdID09PSAnICcpIHJldHVybiBwb2ludGVyICsgMTtcbiAgICByZXR1cm4gdGhpcy5nZXRXb3JkQm91bmRhcnkodGV4dCwgcG9pbnRlcik7XG4gIH1cblxuICBpc01pZFdvcmQoKSB7XG4gICAgY29uc3QgeCA9IHRoaXMuZWxlbWVudENvbnRlbnQoKS5jaGFyQXQodGhpcy5jYXJldFBvc2l0aW9uKTtcbiAgICByZXR1cm4gISEoeCAmJiB4ICE9PSAnICcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcmV0O1xuIiwiLyoqXG4gKiBCYXNlIGludGVyZmFjZSB0aGF0IGRhdGUgZm9ybWF0IG9iamVjdHMgbmVlZCB0byBpbXBsZW1lbnQuXG4gKiBUaGUgcmVzdCBvZiB0aGlzIGZpbGUgc2hvd3Mgc29tZSBleGFtcGxlcyBvZiBob3cgdGhlIHJlZ2V4IG1hdGNoZXNcbiAqIGNhbiBiZSBtYW5pcHVsYXRlZCB0byBnZW5lcmF0ZSBkaWZmZXJlbnQgb3V0cHV0cy5cbiAqL1xuY2xhc3MgSURhdGVGb3JtYXQge1xuICAvKipcbiAgICogQ2FsbGJhY2sgZnVuY3Rpb24gdG8gYSBzdHJpbmcucmVwbGFjZSBmdW5jdGlvbi5cbiAgICogUmVjaWV2ZXMgYW4gYXJiaXRyYXJ5IHNldCBvZiBhcmd1bWVudHMgZGVwZW5kaW5nIG9uIGhvdyBtYW55XG4gICAqIHN1Ym1hdGNoZXMgd2VyZSBmb3VuZCBpbiB0aGUgdGFyZ2V0IHN0cmluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoIC0gU3RyaW5nIG1hdGNoaW5nIHRoZSByZWdleCBwYXR0ZXJuLlxuICAgKiBUaGlzIHdpbGwgaGF2ZSB0aGUgZm9ybSB7MjAxOC05LTIxfSBmb3IgZGF0ZXMsIGFuZCB7MjAxOS05LTIxIDIzOjU5fVxuICAgKiBmb3IgZGF0ZXMgd2l0aCB0aW1lcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGV4dCB0byBkaXNwbGF5IGFzIGFuIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uXG4gICAqL1xuICByZXBsYWNlcihtYXRjaCwgLi4uc3VibWF0Y2hlcykge1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5jbGFzcyBCYXNpY1Nob3J0TW9udGggZXh0ZW5kcyBJRGF0ZUZvcm1hdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kYXRlQW5kVGltZSA9ICdoaDptbSwgTU0gREQnO1xuICAgIHRoaXMuZGF0ZU9ubHkgPSAnTU0gREQnO1xuICAgIHRoaXMubW9udGhzID0ge1xuICAgICAgMTogJ0phbi4nLFxuICAgICAgMjogJ0ZlYi4nLFxuICAgICAgMzogJ01hci4nLFxuICAgICAgNDogJ0Fwci4nLFxuICAgICAgNTogJ01hci4nLFxuICAgICAgNjogJ0p1bi4nLFxuICAgICAgNzogJ0p1bC4nLFxuICAgICAgODogJ0F1Zy4nLFxuICAgICAgOTogJ1NlcC4nLFxuICAgICAgMTA6ICdPY3QuJyxcbiAgICAgIDExOiAnTm92LicsXG4gICAgICAxMjogJ0RlYy4nLFxuICAgIH07XG4gIH1cblxuICByZXBsYWNlcihtYXRjaCwgLi4uc3VibWF0Y2hlcykge1xuICAgIGNvbnN0IGluY2x1ZGVzVGltZSA9IG1hdGNoLmxlbmd0aCA+IDExO1xuICAgIGlmIChpbmNsdWRlc1RpbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcGxhY2VEYXRlVGltZShzdWJtYXRjaGVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZURhdGVPbmx5KHN1Ym1hdGNoZXMpO1xuICB9XG5cbiAgcmVwbGFjZURhdGVPbmx5KHN1Ym1hdGNoZXMpIHtcbiAgICBjb25zdCBbLCBtb250aCwgZGF5XSA9IHN1Ym1hdGNoZXM7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZU9ubHlcbiAgICAgIC5yZXBsYWNlKCdNTScsIHRoaXMubW9udGhzW21vbnRoXSlcbiAgICAgIC5yZXBsYWNlKCdERCcsIGRheSk7XG4gIH1cblxuICByZXBsYWNlRGF0ZVRpbWUoc3VibWF0Y2hlcykge1xuICAgIGNvbnN0IFssIG1vbnRoLCBkYXksIGhyLCBtaW5dID0gc3VibWF0Y2hlcztcbiAgICByZXR1cm4gdGhpcy5kYXRlQW5kVGltZVxuICAgICAgLnJlcGxhY2UoJ01NJywgdGhpcy5tb250aHNbbW9udGhdKVxuICAgICAgLnJlcGxhY2UoJ0REJywgZGF5KVxuICAgICAgLnJlcGxhY2UoJ2hoJywgaHIpXG4gICAgICAucmVwbGFjZSgnbW0nLCBtaW4pO1xuICB9XG59XG5cbmNsYXNzIEJhc2ljTG9uZ01vbnRoIGV4dGVuZHMgQmFzaWNTaG9ydE1vbnRoIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1vbnRocyA9IHtcbiAgICAgIDE6ICdKYW51YXJ5JyxcbiAgICAgIDI6ICdGZWJydWFyeScsXG4gICAgICAzOiAnTWFyY2gnLFxuICAgICAgNDogJ0FwcmlsJyxcbiAgICAgIDU6ICdNYXJjaCcsXG4gICAgICA2OiAnSnVuZScsXG4gICAgICA3OiAnSnVseScsXG4gICAgICA4OiAnQXVndXN0JyxcbiAgICAgIDk6ICdTZXB0ZW1iZXInLFxuICAgICAgMTA6ICdPY3RvYmVyJyxcbiAgICAgIDExOiAnTm92ZW1iZXInLFxuICAgICAgMTI6ICdEZWNlbWJlcicsXG4gICAgfTtcbiAgfVxufVxuXG5jbGFzcyBTaG9ydE1vbnRoQU1QTSBleHRlbmRzIEJhc2ljU2hvcnRNb250aCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kYXRlQW5kVGltZSA9ICdoaDptbVBQLCBNTSBERCc7XG4gIH1cblxuICByZXBsYWNlRGF0ZVRpbWUoc3VibWF0Y2hlcykge1xuICAgIGNvbnN0IFssIG1vbnRoLCBkYXksIGhyLCBtaW5dID0gc3VibWF0Y2hlcztcblxuICAgIGxldCBhbXBtID0gJ2FtJztcbiAgICBsZXQgaG91ciA9IHBhcnNlSW50KGhyLCAxMCk7XG4gICAgaWYgKGhvdXIgPiAxMSkge1xuICAgICAgaG91ciAtPSAxMjtcbiAgICAgIGFtcG0gPSAncG0nO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRhdGVBbmRUaW1lXG4gICAgICAucmVwbGFjZSgnTU0nLCB0aGlzLm1vbnRoc1ttb250aF0pXG4gICAgICAucmVwbGFjZSgnREQnLCBkYXkpXG4gICAgICAucmVwbGFjZSgnaGgnLCBob3VyLnRvU3RyaW5nKCkpXG4gICAgICAucmVwbGFjZSgnbW0nLCBtaW4pXG4gICAgICAucmVwbGFjZSgnUFAnLCBhbXBtKTtcbiAgfVxufVxuXG5jb25zdCBiYXNpY1Nob3J0TW9udGggPSBuZXcgQmFzaWNTaG9ydE1vbnRoKCk7XG5jb25zdCBiYXNpY0xvbmdNb250aCA9IG5ldyBCYXNpY0xvbmdNb250aCgpO1xuY29uc3Qgc2hvcnRNb250aEFNUE0gPSBuZXcgU2hvcnRNb250aEFNUE0oKTtcblxuZXhwb3J0IHtcbiAgYmFzaWNTaG9ydE1vbnRoLFxuICBiYXNpY0xvbmdNb250aCxcbiAgc2hvcnRNb250aEFNUE0sXG59O1xuIiwiLyogZ2xvYmFsIHdpbmRvdywgZG9jdW1lbnQgKi9cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uQ29vcmRzKCkge1xuICBsZXQgeCA9IDA7XG4gIGxldCB5ID0gMDtcblxuICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gIGlmIChzZWwucmFuZ2VDb3VudCkge1xuICAgIGNvbnN0IHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCkuY2xvbmVSYW5nZSgpO1xuICAgIGlmIChyYW5nZS5nZXRDbGllbnRSZWN0cykge1xuICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgICBpZiAocmFuZ2UuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSByYW5nZS5nZXRDbGllbnRSZWN0cygpWzBdO1xuICAgICAgICB4ID0gcmVjdC5sZWZ0O1xuICAgICAgICB5ID0gcmVjdC50b3A7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmFsbCBiYWNrIHRvIGluc2VydGluZyBhIHRlbXBvcmFyeSBlbGVtZW50XG4gICAgaWYgKHggPT09IDAgJiYgeSA9PT0gMCkge1xuICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGlmIChzcGFuLmdldENsaWVudFJlY3RzKSB7XG4gICAgICAgIC8vIEVuc3VyZSBzcGFuIGhhcyBkaW1lbnNpb25zIGFuZCBwb3NpdGlvbiBieVxuICAgICAgICAvLyBhZGRpbmcgYSB6ZXJvLXdpZHRoIHNwYWNlIGNoYXJhY3RlclxuICAgICAgICBzcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdcXHUyMDBiJykpO1xuICAgICAgICByYW5nZS5pbnNlcnROb2RlKHNwYW4pO1xuICAgICAgICBjb25zdCByZWN0ID0gc3Bhbi5nZXRDbGllbnRSZWN0cygpWzBdO1xuICAgICAgICB4ID0gcmVjdC5sZWZ0O1xuICAgICAgICB5ID0gcmVjdC50b3A7XG4gICAgICAgIGNvbnN0IHNwYW5QYXJlbnQgPSBzcGFuLnBhcmVudE5vZGU7XG4gICAgICAgIHNwYW5QYXJlbnQucmVtb3ZlQ2hpbGQoc3Bhbik7XG5cbiAgICAgICAgLy8gR2x1ZSBhbnkgYnJva2VuIHRleHQgbm9kZXMgYmFjayB0b2dldGhlclxuICAgICAgICBzcGFuUGFyZW50Lm5vcm1hbGl6ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4geyB4LCB5IH07XG59XG5cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBzcGFuIGVsZW1lbnQgdGhhdCBpdHNlbGYgY29udGFpbnMgdHdvIHNwYW5zLlxuICogVGhlIHByZWZpeCBhbmQgc3VmZml4IHBvcnRpb25zIG9mIHRoZSB0ZXh0IGdldCBkaWZmZXJlbnRcbiAqIGNsYXNzIG5hbWVzIHNvIHRoYXQgdGhlIHVzZXIgY2FuIHJlY2VpdmUgdmlzdWFsIGZlZWRiYWNrXG4gKiBhcyB0aGV5IHR5cGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gU3Vic3RyaW5nIG9mIHRoZSBzdWdnZXN0aW9uIHRleHRcbiAqIHRoYXQgdGhlIHVzZXIgaGFzIGFscmVhZHkgdHlwZWQgaW50byB0aGUgaW5wdXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWZmaXggLSBTdWJzdHJpbmcgb2YgdGhlIHN1Z2dlc3Rpb24gdGV4dFxuICogdGhhdCB0aGUgdXNlciBoYXMgbm90IHlldCB0eXBlZCBpbnRvIHRoZSBpbnB1dCBlbGVtZW50LlxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUlubmVyTm9kZXMocHJlZml4LCBzdWZmaXgpIHtcbiAgY29uc3QgcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBwcmUuY2xhc3NMaXN0LmFkZCgnYXV0b2NvbXBsZXRlLXByZWZpeCcpO1xuICBwcmUuaW5uZXJUZXh0ID0gcHJlZml4O1xuXG4gIGNvbnN0IHN1ZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgc3VmLmNsYXNzTGlzdC5hZGQoJ2F1dG9jb21wbGV0ZS1zdWZmaXgnKTtcbiAgc3VmLmlubmVyVGV4dCA9IHN1ZmZpeDtcblxuICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBzcGFuLmFwcGVuZENoaWxkKHByZSk7XG4gIHNwYW4uYXBwZW5kQ2hpbGQoc3VmKTtcbiAgcmV0dXJuIHNwYW47XG59XG5cblxuLy8gdGhlIGRpdiB0aGF0IHdpbGwgY29udGFpbiB0aGUgdGVybSBpbmZvXG5jbGFzcyBQYW5lbCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ2F1dG9jb21wbGV0ZS1wYW5lbCcpO1xuICAgIHRoaXMucGFuZWwuaWQgPSAnZGF0ZXMtYXV0b2NvbXBsZXRlLXBvcHVwJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuXG4gICAgdGhpcy5jdXJyZW50U3VmZml4O1xuICB9XG5cbiAgZm91bmRUZXJtKGVsZW1lbnQsIGN1cnJlbnRXb3JkLCB0ZXJtKSB7XG4gICAgLy8gR2V0IHRoZSBzdWZmaXggZnJvbSB0aGUgdGVybVxuICAgIGNvbnN0IHN1ZmZpeCA9IHRoaXMuc2V0U3VmZml4KGN1cnJlbnRXb3JkLCB0ZXJtKTtcblxuICAgIC8vIHBsYWNlIHRoZSBhcHByb3ByaWF0ZSB0ZXh0IGluIHRoZSBkaXZcbiAgICBjb25zdCBzcGFuID0gZ2VuZXJhdGVJbm5lck5vZGVzKGN1cnJlbnRXb3JkLCBzdWZmaXgpO1xuICAgIHRoaXMucGFuZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZChzcGFuKTtcblxuICAgIC8vIElmIHRoZSBwYW5lbCBpcyBub3QgeWV0IHJlbmRlcmVkLCBzZXQgdGhlIGxvY2F0aW9uLlxuICAgIC8vIERvbid0IG1vdmUgdGhlIHBhbmVsIGlmIHRoZSB1c2VyIGlzIGluIHRoZSBtaWRkbGUgb2YgdHlwaW5nIGEgd29yZFxuICAgIGlmICghdGhpcy5pc1Zpc2libGUoKSkgdGhpcy5zZXRQYW5lbFBvc2l0aW9uKGN1cnJlbnRXb3JkKTtcblxuICAgIHRoaXMucGFuZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuaGlkZSgpKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgdGhpcy5wYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG5cbiAgaXNWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLnBhbmVsLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJztcbiAgfVxuXG4gIHNldFN1ZmZpeChjdXJyZW50V29yZCwgdGVybSkge1xuICAgIHRoaXMuY3VycmVudFN1ZmZpeCA9IHRlcm0uc2xpY2UoY3VycmVudFdvcmQubGVuZ3RoKTtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3VmZml4O1xuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBpbnRlcmZhY2UgZm9yIHRoZSBzdWZmaXguXG4gICAqL1xuICBnZXRTdWZmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFN1ZmZpeDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3NpdGlvbnMgdGhlIHBhbmVsIGFib3ZlIHRoZSBjdXJzb3IuXG4gICAqIFByb3ZpZGVzIGEgc21hbGwgbGVmdCBvZmZzZXQgb2YgYSBzaXplIHJlbGF0aXZlIHRvIHRoZSBsZW5ndGggb2ZcbiAgICogdGhlIHByZWZpeC4gU2luY2UgdGhlIHBvc2l0aW9uIGlzIG9ubHkgY2FsY3VsYXRlZCB3aGVuIHRoZSBwYW5lbFxuICAgKiBpcyBmaXJzdCBtYWRlIHZpc2libGUgKGFuZCBub3Qgb24gc3Vic2VxdWVudCBpbnB1dCksIHRoaXMgb2Zmc2V0XG4gICAqIHdpbGwgdXN1YWxseSBiZSBuZWdsaWdpYmxlLiBIb3dldmVyLCBpdCBtYWtlcyBmb3IgYSBuaWNlciBkaXNwbGF5XG4gICAqIHdoZW4gZ29pbmcgYmFjayB0byBjb21wbGV0ZSBhIHRlcm0gdGhhdCB3YXMgb25seSBwYXJ0aWFsbHkgdHlwZWRcbiAgICogaW4gYnV0IG5vdCBjb21wbGV0ZWQuXG4gICAqXG4gICAqIEl0IG1pZ2h0IGJlIGJldHRlciB0byBjYWxjdWxhdGUgb2Zmc2V0cyBiYXNlZCBvbiBjb21wdXRlZCBzdHlsZXNcbiAgICogZXRjLiwgYnV0IHRoZXNlIGJhc2ljIHZhbHVlcyB3b3JrIHJlYXNvbmFibHkgd2VsbCBmb3IgdGhlIGRlZmF1bHRcbiAgICogWFRNIGRpc3BsYXkuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBTdWJzdHJpbmcgb2YgdGhlIGN1cnJlbnQgdGVybSB0aGF0IHRoZVxuICAgKiB1c2VyIGhhcyBhbHJlYWR5IHR5cGVkIGludG8gdGhlIHRleHQgZW50cnkgZWxlbWVudFxuICAgKi9cbiAgc2V0UGFuZWxQb3NpdGlvbihwcmVmaXgpIHtcbiAgICAvLyB4IGFuZCB5IHBvc2l0aW9ucyBvZiB0aGUgdGV4dCBjdXJzb3JcbiAgICBjb25zdCB7IHgsIHkgfSA9IGdldFNlbGVjdGlvbkNvb3JkcygpO1xuICAgIGNvbnN0IG5ld3ggPSB4IC0gcHJlZml4Lmxlbmd0aCAqIDQ7XG4gICAgY29uc3QgbmV3eSA9IHkgLSAzNTtcbiAgICB0aGlzLnBhbmVsLnN0eWxlLnRvcCA9IGAke25ld3l9cHhgO1xuICAgIHRoaXMucGFuZWwuc3R5bGUubGVmdCA9IGAke25ld3h9cHhgO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhbmVsO1xuIiwiLyogZ2xvYmFsIGRvY3VtZW50ICovXG5cbmltcG9ydCBwYXJzZURhdGVzIGZyb20gJy4vcGFyc2VEYXRlcyc7XG5cbmNsYXNzIFRlcm1MaXN0IHtcbiAgY29uc3RydWN0b3IoZm9ybWF0KSB7XG4gICAgdGhpcy5saXN0ID0ge307XG4gICAgdGhpcy5kYXRlRm9ybWF0ID0gZm9ybWF0O1xuICB9XG5cbiAgLy8gR2V0IGRhdGVzIGZyb20gdGhlIHNvdXJjZSB0ZXh0XG4gIGFkZFNlZ21lbnQoc2VnbWVudE51bSkge1xuICAgIC8vIFNpbmNlIHRoZSBzb3VyY2UgdGV4dCBkb2VzIG5vdCBjaGFuZ2UgZHluYW1pY2FsbHksIHdlIGRvbid0IG5lZWQgdG8gcmUtcHJvY2Vzc1xuICAgIC8vIGEgc2VnbWVudCBhZnRlciBpdCBoYXMgYmVlbiBwYXJzZWQgYW5kIGFkZGVkIHRvIHRoZSBsaXN0XG4gICAgaWYgKHRoaXMubGlzdFtzZWdtZW50TnVtXSkgcmV0dXJuO1xuXG4gICAgLy8gZ3JhYiBhIHJlZmVyZW5jZSB0byB0aGUgc291cmNlIHRleHQgdGhhdCBjb3JyZXNwb25kcyB0byB0aGVcbiAgICAvLyBjaG9zZW4gc2VnbWVudCBhbmQgcGFyc2UgdGhlIHRleHQgdG8gZmluZCB3aGF0IGRhdGVzIGFyZSBpbnNpZGVcbiAgICBjb25zdCBzcmMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc291cmNlQ29udGVudCR7c2VnbWVudE51bX1gKTtcbiAgICBjb25zdCBkYXRlcyA9IHBhcnNlRGF0ZXMoc3JjLmlubmVyVGV4dCk7XG5cbiAgICBkYXRlc1xuICAgICAgLm1hcCgoeCkgPT4gdGhpcy5kYXRlRm9ybWF0dGVyKHgpKVxuICAgICAgLmZvckVhY2goKGRhdGUpID0+IHsgdGhpcy5hZGRUZXJtKHNlZ21lbnROdW0sIGRhdGUpOyB9KTtcbiAgfVxuXG4gIC8vIEFkZHMgYSBzaW5nbGUgdGVybSB0byB0aGUgdGVybSBhcnJheVxuICBhZGRUZXJtKHNlZ21lbnROdW0sIHRlcm0pIHtcbiAgICAvLyBFbnN1cmUgdGhhdCBhIGRpY3Rpb25hcnkgZW50cnkgZXhpc3RzIGZvciB0aGUgc2VnbWVudCBudW1iZXJcbiAgICBpZiAoIXRoaXMubGlzdFtzZWdtZW50TnVtXSkgdGhpcy5saXN0W3NlZ21lbnROdW1dID0gW107XG5cbiAgICAvLyBBdm9pZCBkdXBsaWNhdGUgZW50cmllc1xuICAgIGlmICh0aGlzLmxpc3Rbc2VnbWVudE51bV0uaW5kZXhPZih0ZXJtKSA9PT0gLTEpIHRoaXMubGlzdFtzZWdtZW50TnVtXS5wdXNoKHRlcm0pO1xuICB9XG5cbiAgZGF0ZUZvcm1hdHRlcihkKSB7XG4gICAgLy8gQ2xvc3VyZVxuICAgIGNvbnN0IHIgPSAoLi4uYXJncykgPT4gdGhpcy5kYXRlRm9ybWF0LnJlcGxhY2VyKC4uLmFyZ3MpO1xuICAgIHJldHVybiBkLnJlcGxhY2UoL3soXFxkezR9KS0oWzAtMl0/WzAtOV0pLShbMS0zXT9bMC05XSkoPzogKFswLTJdP1swLTldKTooWzAtNV1bMC05XSkpP30vLCByKTtcbiAgfVxuXG5cbiAgLy8gUmV0dXJucyB0aGUgYXJyYXkgZm9yIGEgZ2l2ZW4gc2VnbWVudCAoZW1wdHkgYXJyYXkgaWYgbm9uZSBleGlzdHMpXG4gIGdldFNlZ21lbnRBcnJheShudW0pIHtcbiAgICByZXR1cm4gdGhpcy5saXN0W251bV0gfHwgW107XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVybUxpc3Q7XG4iLCIvKiBnbG9iYWwgd2luZG93LCBkb2N1bWVudCAqL1xuXG5pbXBvcnQgQ2FyZXQgZnJvbSAnLi9DYXJldCc7XG5cbi8qKlxuICogQ2xpY2tpbmcgYW55d2hlcmUgb24gdGhlIHNjcmVlbiBjYXVzZXNcbiAqIHRoZSBzdWdnZXN0aW9ucyBwYW5lbCB0byBkaXNhcHBlYXIuXG4gKiBAcGFyYW0geyp9IHBhbmVsXG4gKi9cbmZ1bmN0aW9uIGNsaWNrSGFuZGxlcihwYW5lbCkge1xuICBwYW5lbC5oaWRlKCk7XG59XG5cblxuZnVuY3Rpb24gaW5zZXJ0U3VmZml4KHRleHQsIHN1ZmZpeCwgY2FyZXQpIHtcbiAgY29uc3QgcG9zID0gY2FyZXQuY2FyZXRQb3NpdGlvbjtcbiAgcmV0dXJuIHRleHQuc3Vic3RyKDAsIHBvcykgKyBzdWZmaXggKyB0ZXh0LnN1YnN0cihwb3MpO1xufVxuXG5cbmZ1bmN0aW9uIHJlcGxhY2VFbGVtZW50VGV4dFdpdGhBdXRvY29tcGxldGVkVGV4dChub2RlLCBwYW5lbCwgY2FyZXQpIHtcbiAgLy8gaW5uZXJUZXh0IHdpbGwgdXN1YWxseSBiZSB0aGUgY29ycmVjdCBjaG9pY2VcbiAgLy8gc2luY2UgWFRNIHVzZXMgcCBlbGVtZW50c1xuICBjb25zdCB0eHRQcm9wID0gbm9kZS52YWx1ZSA/ICd2YWx1ZScgOiAnaW5uZXJUZXh0JztcblxuICAvLyBTaW5jZSB0aGUgdXNlciBoYXMgYWxyZWFkeSB0eXBlZCBpbiBwYXJ0IG9mIHRoZSB0ZXJtLFxuICAvLyByZXRyaWV2ZSB0aGUgcmVtYWluaW5nIHBhcnQgdGhhdCB0aGV5IGhhdmVuJ3QgeWV0IHR5cGVkIGluLFxuICAvLyB0aGVuIHB1dCBpdCBpbnRvIHRoZSBpbnB1dCBlbGVtZW50XG4gIGNvbnN0IHN1ZmZpeCA9IHBhbmVsLmdldFN1ZmZpeCgpO1xuICBub2RlW3R4dFByb3BdID0gaW5zZXJ0U3VmZml4KG5vZGVbdHh0UHJvcF0sIHN1ZmZpeCwgY2FyZXQpO1xuICBwYW5lbC5oaWRlKCk7XG5cbiAgLy8gUmVwb3NpdGlvbiB0aGUgY3Vyc29yIGJlY2F1c2UgaXQgZ2V0cyBtb3ZlZCBiYWNrIHRvIHBvc2l0aW9uIDAgYnkgZGVmYXVsdFxuICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNldFN0YXJ0KG5vZGUuY2hpbGROb2Rlc1swXSwgY2FyZXQuY2FyZXRQb3NpdGlvbiArIHN1ZmZpeC5sZW5ndGgpO1xuICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuXG4gICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICB9LCA1KTtcbn1cblxuXG4vKipcbiAqIEhhbmRsZXIgZm9yIHNwZWNpZmljIGtleXByZXNzZXMgdGhhdCBkbyBub3QgY291bnQgYXMgXCJpbnB1dFwiIGludG8gdGhlXG4gKiB0YXJnZXQgdGV4dCBlbGVtZW50LlxuICogUHJpbWFyaWx5IHVzZWQgdG8gcHJldmVudERlZmF1bHQgb24gdGhlIFRhYiBrZXkgYW5kIGluc2VydCB0aGVcbiAqIHN1Z2dlc3RlZCB0ZXh0IGludG8gdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0geyp9IGUgLSBFdmVudFxuICovXG5mdW5jdGlvbiBrZXlEb3duSGFuZGxlcihlLCBwYW5lbCwgY2FyZXQpIHtcbiAgLy8gSGFuZGxlcyB1c2VyIGNsaWNraW5nIHNwZWNpZmljIGtleXNcbiAgY29uc3Qgbm9kZSA9IGUuY3VycmVudFRhcmdldDtcblxuICAvLyBBcnJvdyBrZXlzXG4gIGlmIChlLmtleUNvZGUgPj0gMzcgJiYgZS5rZXlDb2RlIDw9IDQwKSB7XG4gICAgcGFuZWwuaGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFRhYiBrZXlcbiAgaWYgKGUua2V5Q29kZSA9PT0gOSAmJiBwYW5lbC5pc1Zpc2libGUoKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXBsYWNlRWxlbWVudFRleHRXaXRoQXV0b2NvbXBsZXRlZFRleHQobm9kZSwgcGFuZWwsIGNhcmV0KTtcbiAgfVxufVxuXG5cbi8qKlxuICogQ2xvc2VzIGFueSBleGlzdGluZyBwYW5lbHMsIHRoZW4gdXBkYXRlcyB0aGUgZ2xvYmFsIHRlcm1zIG9iamVjdCB3aXRoIHRoZVxuICogdGVybXMgZm91bmQgaW4gdGhlIHNvdXJjZSB0ZXh0IHdoZW4gYSBuZXcgc2VnbWVudCBoYXMgYmVlbiBmb2N1c2VkLlxuICogVE9ETzogUmVmYWN0b3IuIEJ1aWxkIHRoZSBlbnRpcmUgdGVybSBsaXN0IGFzIHNvb24gYXMgdGhlIHBhZ2UgbG9hZHMsIHRoZW5cbiAqIHRoZSBpbnB1dEhhbmRsZXIgY2FuIHNpbXBseSByZXRyaWV2ZSB0aGUgYXJyYXkgaXQgbmVlZHMsIGFuZCB0aGlzXG4gKiBmdW5jdGlvbiBjYW4gYmUgcmVkdWNlZCB0byBqdXN0IGhpZGluZyB0aGUgcGFuZWwuXG4gKi9cbmZ1bmN0aW9uIGZvY3VzSGFuZGxlcihlLCBwYW5lbCwgdGVybWxpc3QpIHtcbiAgcGFuZWwuaGlkZSgpO1xuICBjb25zdCBpZG51bSA9IE51bWJlcihlLmN1cnJlbnRUYXJnZXQuaWQuc2xpY2UoNykpO1xuICB0ZXJtbGlzdC5hZGRTZWdtZW50KGlkbnVtKTtcbiAgcmV0dXJuIHRlcm1saXN0LmdldFNlZ21lbnRBcnJheShpZG51bSk7XG59XG5cblxuLy8gcmV0dXJucyB0aGUgZmlyc3QgdGVybSBvZiB3aGljaCB0aGUgY3VycmVudCB3b3JkXG4vLyBpcyBhIHBhcnRpYWwgbWF0Y2guIFJldHVybnMgbnVsbCBpZiBubyB3b3JkIGlzIG1hdGNoZWQuXG5mdW5jdGlvbiBtYXRjaGVzVGVybSh3b3JkLCB0ZXJtcykge1xuICBjb25zdCBlc2NhcGVkID0gd29yZC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpO1xuICBjb25zdCByZSA9IG5ldyBSZWdFeHAoYF4ke2VzY2FwZWR9YCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXJtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHRlcm0gPSB0ZXJtc1tpXTtcbiAgICAvLyBjaGVjayBmb3Igc3RyaWN0IGVxdWFsaXR5IHNvIHRoYXQgdGhlIHBhbmVsXG4gICAgLy8gZGlzYXBwZWFycyB3aGVuIHRoZSBlbnRpcmUgd29yZCBoYXMgYmVlbiB3cml0dGVuXG4gICAgaWYgKHJlLnRlc3QodGVybSkgJiYgd29yZCAhPT0gdGVybSkgcmV0dXJuIHRlcm07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuZnVuY3Rpb24gYXV0b2NvbXBsZXRlUG9wdXAoZWxlbWVudCwgdGVybXMsIGN1cnJlbnRXb3JkLCBwYW5lbCkge1xuICBpZiAoY3VycmVudFdvcmQubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IG1hdGNoZWRUZXJtID0gbWF0Y2hlc1Rlcm0oY3VycmVudFdvcmQsIHRlcm1zKTtcbiAgICBpZiAobWF0Y2hlZFRlcm0pIHtcbiAgICAgIHBhbmVsLmZvdW5kVGVybShlbGVtZW50LCBjdXJyZW50V29yZCwgbWF0Y2hlZFRlcm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYW5lbC5oaWRlKCk7XG4gICAgfVxuICB9XG59XG5cblxuLyoqXG4gKiBIYW5kbGVzIHVzZXIgaW5wdXQgb2YgdGV4dCBpbnRvIGFuIGVsZW1lbnQuXG4gKiBAcGFyYW0geyp9IGUgLSBJbnB1dCBldmVudFxuICovXG5mdW5jdGlvbiBpbnB1dEhhbmRsZXIoZSwgcGFuZWwsIGNhcmV0LCB0ZXJtcykge1xuICAvLyBDbG9zZSB0aGUgcG9wdXAgYW5kIHNob3J0LWNpcmN1aXQgaWYgZGVsZXRpbmcgdGhlIGxhc3QgY2hhcmFjdGVyXG4gIGNvbnN0IGVsZW1lbnRDb250ZW50ID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlIHx8IGUuY3VycmVudFRhcmdldC5pbm5lclRleHQ7XG4gIGlmICghZWxlbWVudENvbnRlbnQpIHtcbiAgICBwYW5lbC5oaWRlKCk7XG4gICAgcmV0dXJuIGNhcmV0O1xuICB9XG5cbiAgLy8gVHJhY2sgdGhlIHBvc2l0aW9uIG9mIHRoZSBjYXJldCBhbmQgdGhlIGN1cnJlbnQgd29yZCBiZWluZyB0eXBlZFxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgY2FyZXQgPSBuZXcgQ2FyZXQoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBjdXJyZW50bHkgaW4gYmV0d2VlbiB0d28gbGV0dGVycyxcbiAgLy8gaW5kaWNhdGluZyB0aGF0IHRoZXkgYXJlIGVkaXRpbmcgYSB3b3JkIGFuZCB0aHVzIGRvXG4gIC8vIG5vdCBuZWVkIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uc1xuICBpZiAoIWNhcmV0LmlzTWlkV29yZCgpICYmIGNhcmV0LmN1cnJlbnRXb3JkLmxlbmd0aCA+IDApIHtcbiAgICBhdXRvY29tcGxldGVQb3B1cChlLmN1cnJlbnRUYXJnZXQsIHRlcm1zLCBjYXJldC5jdXJyZW50V29yZCwgcGFuZWwpO1xuICB9IGVsc2UgaWYgKGNhcmV0LmN1cnJlbnRXb3JkLmxlbmd0aCA8IDEpIHtcbiAgICBwYW5lbC5oaWRlKCk7XG4gIH1cblxuICByZXR1cm4gY2FyZXQ7XG59XG5cblxuZXhwb3J0IHtcbiAgY2xpY2tIYW5kbGVyLFxuICBmb2N1c0hhbmRsZXIsXG4gIGlucHV0SGFuZGxlcixcbiAga2V5RG93bkhhbmRsZXIsXG59O1xuIiwiLyogZ2xvYmFsIHdpbmRvdywgZG9jdW1lbnQgKi9cblxuaW1wb3J0IFBhbmVsIGZyb20gJy4vUGFuZWwnO1xuaW1wb3J0IFRlcm1MaXN0IGZyb20gJy4vVGVybUxpc3QnO1xuaW1wb3J0IHtcbiAgY2xpY2tIYW5kbGVyLFxuICBmb2N1c0hhbmRsZXIsXG4gIGlucHV0SGFuZGxlcixcbiAga2V5RG93bkhhbmRsZXIsXG59IGZyb20gJy4vaGFuZGxlcnMnO1xuaW1wb3J0IHtcbiAgYmFzaWNTaG9ydE1vbnRoLFxuICBiYXNpY0xvbmdNb250aCxcbiAgc2hvcnRNb250aEFNUE0sXG4gIH0gZnJvbSAnLi9EYXRlRm9ybWF0cyc7XG5cbi8qKlxuICogU3RvcmVzIHRoZSB0ZXJtcyB0aGF0IGNhbiBhcHBlYXIgYXMgc3VnZ2VzdGlvbnMgaW4gdGhlIHBvcC11cCBkaXYuXG4gKiBUaGlzIGlzIHNjb3BlZCBhcyBhIG1vZHVsZS1sZXZlbCB2YXJpYWJsZSBzbyB0aGF0IHdlIGRvbid0IG5lZWQgdG9cbiAqIHJlLXByb2Nlc3MgZWFjaCBzZWdtZW50J3Mgc291cmNlIHRleHQgZXZlcnkgdGltZSB3ZSBlbnRlciBhIG5ldyBzZWdtZW50LlxuICogQGV4YW1wbGVcbiAqIHRlcm1saXN0LnRlcm1zID0ge1xuICogICAwOiBbJ0p1bHkgMycsICc3LzMnXSxcbiAqICAgMTogW10sXG4gKiAgIDI6IFsnMTI6MzAsIEp1bHkgNCcsICc3LzMgMTI6MzAnXVxuICogfVxuICovXG5sZXQgdGVybWxpc3QgPSBuZXcgVGVybUxpc3QoYmFzaWNTaG9ydE1vbnRoKTtcblxuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgYSBkaXYgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXNlZCB0byBkaXNwbGF5IHRoZVxuICogYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb25zLlxuICovXG5jb25zdCBwYW5lbCA9IG5ldyBQYW5lbCgpO1xuXG5cbi8qKlxuICogTGlzdCBvZiBzdWdnZXN0aW9ucyB0byBkaXNwbGF5IHdoZW4gaW5wdXR0aW5nIHRleHQgaW50byBhbiBlbGVtZW50LlxuICovXG5sZXQgdGVybXMgPSBbXTtcblxuLyoqXG4gKiBUaGUgcG9zaXRpb24gb2YgdGhlIHRleHQgY2FyZXQgaXMgdHJhY2tlZCB3aXRoIGV2ZXJ5IGlucHV0IGludG8gYVxuICogdGFyZ2V0IHRleHQgZWxlbWVudC4gSXQgaXMgc2NvcGVkIGhlcmUgYmVjYXVzZSBpdCBuZWVkcyB0byBiZSBzaGFyZWRcbiAqIHdpdGggdGhlIGtleURvd25IYW5kbGVyIHNvIHRoZSBUYWIga2V5IGNhbiBwZXJmb3JtIHRoZSBhdXRvY29tcGxldGUuXG4gKi9cbmxldCBjYXJldDtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGRlcHRoIG9mIHRoZSBjdXJyZW50IGZyYW1lIHJlbGF0aXZlIHRvIHdpbmRvdy50b3BcbiAqIEBwYXJhbSB7b2JqZWN0fSB3aW5Ub0lEIC0gV2luZG93IGVsZW1lbnQgd2hvc2UgZGVwdGggaXMgdG8gYmUgY2FsY3VsYXRlZFxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmZ1bmN0aW9uIGdldEZyYW1lRGVwdGgod2luVG9JRCkge1xuICByZXR1cm4gd2luVG9JRCA9PT0gd2luZG93LnRvcCA/IDAgOiAxICsgZ2V0RnJhbWVEZXB0aCh3aW5Ub0lELnBhcmVudCk7XG59XG5cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGQgW2lkXj1cImNvbnRlbnRcIl0nKTtcbiAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4geyB0ZXJtcyA9IGZvY3VzSGFuZGxlcihlLCBwYW5lbCwgdGVybWxpc3QpOyB9KTtcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsaWNrSGFuZGxlcihwYW5lbCkpO1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHsgY2FyZXQgPSBpbnB1dEhhbmRsZXIoZSwgcGFuZWwsIGNhcmV0LCB0ZXJtcyk7IH0pO1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IGtleURvd25IYW5kbGVyKGUsIHBhbmVsLCBjYXJldCkpO1xuICB9KTtcbn1cblxuXG5mdW5jdGlvbiBjaGFuZ2VIYW5kbGVyKGUpIHtcbiAgY29uc3Qgc2VsZWN0ZWQgPSBlLnRhcmdldC52YWx1ZTtcbiAgc3dpdGNoIChzZWxlY3RlZCkge1xuICAgIGNhc2UgJ2Jhc2ljU2hvcnRNb250aCc6XG4gICAgICB0ZXJtbGlzdCA9IG5ldyBUZXJtTGlzdChiYXNpY1Nob3J0TW9udGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzaWNMb25nTW9udGgnOlxuICAgICAgdGVybWxpc3QgPSBuZXcgVGVybUxpc3QoYmFzaWNMb25nTW9udGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc2hvcnRNb250aEFNUE0nOlxuICAgICAgdGVybWxpc3QgPSBuZXcgVGVybUxpc3Qoc2hvcnRNb250aEFNUE0pO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgLy8gRm9yIFhUTVxuICAvLyBpZihnZXRGcmFtZURlcHRoICh3aW5kb3cuc2VsZikgPT09IDIpIG1haW4oKTtcblxuICAvLyBGb3IgZGV2ZWxvcG1lbnRcbiAgY29uc3QgZHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcGRvd24nKTtcbiAgZHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2hhbmdlSGFuZGxlcik7XG4gIG1haW4oKTtcbn0pO1xuIiwiY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbmNvbnN0IHRoaXNZZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG5jb25zdCB0aGlzTW9udGggPSBub3cuZ2V0TW9udGgoKSArIDE7XG5cbmNvbnN0IG9EYXRlRm9ybWF0cyA9IFtcbiAgWycoWzAtOV17NH0pXFxcXHU1RTc0KFswLTFdP1swLTldKVxcXFx1NjcwOChbMC0zXT9bMC05XSlcXFxcdTY1RTVcXFxccz8oWzAtMl0/WzAtOV1bXFxcXHU2NjQyXFxcXHVGRjFBOl1bMC01XVswLTldXFxcXHVGRjVFWzAtMl0/WzAtOV1bXFxcXHU2NjQyXFxcXHVGRjFBOl1bMC01XVswLTldKScsICd7JDEtJDItJDN9ICQ0J10sIC8vIDIwMTflubQ55pyIMTDml6UxMOaZgu+8k++8kH4xMTozMFxuICBbJyhbMC05XXs0fSlcXFxcdTVFNzQoWzAtMV0/WzAtOV0pXFxcXHU2NzA4KFswLTNdP1swLTldKVxcXFx1NjVFNVxcXFxzPyhbMC0yXT9bMC05XSlbXFxcXHU2NjQyXFxcXHVGRjFBOl0oWzAtNV1bMC05XSknLCAneyQxLSQyLSQzICQ0OiQ1fSddLCAvLyAyMDE35bm0OeaciDEw5pelMTDmmYLvvJPvvJDliIZcbiAgWycoWzAtOV17NH0pLyhbMC0xXT9bMC05XSkvKFswLTNdP1swLTldKScsICd7JDEtJDItJDN9J10sIC8vIDIwMTcvOS8xXG4gIFsnKFswLTFdP1swLTldKVxcXFx1NjcwOChbMC0zXT9bMC05XSlcXFxcdTY1RTVcXFxccz8oWzAtMl0/WzAtOV0pW1xcXFx1NjY0MlxcXFx1RkYxQTpdKFswLTVdWzAtOV0pJywgYHske3RoaXNZZWFyfS0kMS0kMiAkMzokNH1gXSwgLy8gOeaciDEw5pelMTDmmYLvvJPvvJDliIZcbiAgWycoWzAtMV0/WzAtOV0pXFxcXHU2NzA4KFswLTNdP1swLTldKVxcXFx1NjVFNVxcXFxzPyhbMC0yXT9bMC05XSlcXFxcdTY2NDInLCBgeyR7dGhpc1llYXJ9LSQxLSQyICQzOjAwfWBdLCAvLyA55pyIMTDml6UxMOaZglxuICBbJyhbMC0xXT9bMC05XSlcXFxcdTY3MDgoWzAtM10/WzAtOV0pXFxcXHU2NUU1XFxcXHM/XFxcXHUzMDZFKFswLTJdP1swLTldKVxcXFx1NjY0MicsIGB7JHt0aGlzWWVhcn0tJDEtJDIgJDM6MDB9YF0sIC8vIDnmnIgxMOaXpeOBrjEw5pmCXG4gIFsnKFswLTldezR9KVxcXFx1NUU3NChbMC0xXT9bMC05XSlcXFxcdTY3MDgoWzAtM10/WzAtOV0pXFxcXHU2NUU1JywgJ3skMS0kMi0kM30nXSwgLy8gMjAxN+W5tDnmnIgxMOaXpVxuICBbJyhbMC05XXs0fSlcXFxcLihbMC0xXT9bMC05XSlcXFxcLihbMC0zXT9bMC05XSknLCAneyQxLSQyLSQzfSddLCAvLyAyMDE3LjkuMTBcbiAgWycoWzAtMl0/WzAtOV0pWzpcXFxcdUZGMUFdKFswLTVdWzAtOV0pIChbMC0xXT9bMC05XSlcXFxcLyhbMC0zXT9bMC05XSknLCBgeyR7dGhpc1llYXJ9LSQzLSQ0ICQxOiQyfWBdLCAvLyAyMTo1OSAwOS8xMFxuICBbJyhbMC0xXT9bMC05XSlcXFxcLyhbMC0zXT9bMC05XSkuKFswLTJdP1swLTldKVs6XFxcXHVGRjFBXShbMC01XVswLTldKScsIGB7JHt0aGlzWWVhcn0tJDEtJDIgJDM6JDR9YF0sIC8vIDA5LzEwIDIxOjU5XG4gIFsnKFswLTFdP1swLTldKVxcXFx1NjcwOChbMC0zXT9bMC05XSlcXFxcdTY1RTUnLCBgeyR7dGhpc1llYXJ9LSQxLSQyfWBdLCAvLyA55pyIMTDml6VcbiAgWydbMC0yXT9bMC05XTpbMC01XVswLTldXFxcXHM/Wy3igJNcXFxcdUZGNUVdXFxcXHM/KFswLTFdP1swLTldKVxcXFwvKFswLTNdP1swLTldKSAoWzAtMl0/WzAtOV06WzAtNV1bMC05XSknLCBgeyR7dGhpc1llYXJ9LSQxLSQyICQzfWBdLCAvLyAxMTowMCAtIDEwLzI5IDIzOjU5IChidWJibGUgY2FsZW5kYXIpXG4gIFsnKFswLTFdP1swLTldKVxcXFwvKFswLTNdP1swLTldKVvvvIgoXVtcXFxcdTY1RTVcXFxcdTY3MDjngavmsLTmnKjph5HlnJ9dW++8iSldJywgYHske3RoaXNZZWFyfS0kMS0kMn1gXSwgLy8gOS8yMe+8iOWcn++8iVxuICBbJyhbMC0xXT9bMC05XSlcXFxcLyhbMC0zXT9bMC05XSlbXFxcXHUzMDRCXFxcXHUzMDdFXVtcXFxcdTMwODlcXFxcdTMwNjddJywgYHske3RoaXNZZWFyfS0kMS0kMn1gXSwgLy8gOS8yMeOBi+OCiSA5LzMx44G+44GnXG4gIFsnKFswLTNdP1swLTldKVxcXFx1NjVFNScsIGB7JHt0aGlzWWVhcn0tJHt0aGlzTW9udGh9LSQxfWBdLCAvLyAxMOaXpVxuXTtcblxuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgYW4gYXJyYXkgYW5kIGFwcGxpZXMgYWxsIHRoZSByZXBsYWNlbWVudHMgaW5kaWNhdGVkXG4gKiBpbiB0aGUgY29uc3RpdHVlbnQgYXJyYXlzLlxuICogQHBhcmFtIHsqW119IGZvcm1hdENoYW5nZXNBcnIgLSBBcnJheSBvZiBzdWJzdHJpbmdzIHRvIHJlcGxhY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIG1vZGlmeVxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcyAtIFJlZ0V4cCBmbGFncy4gRGVmYXVsdHMgdG8gJ2dpJy5cbiAqL1xuZnVuY3Rpb24gcmVwbGFjZUFsbEZyb21BcnJheShmb3JtYXRDaGFuZ2VzQXJyLCBzdHIsIHBhcmFtZXRlcnMpIHtcbiAgbGV0IHN0cmluZyA9IHN0cjtcblxuICBmb3JtYXRDaGFuZ2VzQXJyLmZvckVhY2goKGUpID0+IHtcbiAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAoZVswXSwgcGFyYW1ldGVycyk7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGVbMV0pO1xuICB9KTtcblxuICByZXR1cm4gc3RyaW5nO1xufVxuXG5cbi8qKlxuICogUmVtb3ZlIHdvcmRzIGZyb20gdGhlIEpQIHRoYXQgaGF2ZSBrYW5qaSBpbiB0aGVtIHRoYXQgd291bGQgbm9ybWFsbHkgYmVcbiAqIG1pc3Rha2VuIGZvciBkYXRlcy90aW1lcywgb3IgdGhhdCBzaG91bGQgbmV2ZXIgYmUgdHJhbnNsYXRlZCBhcyBkYXRlcy90aW1lcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBUaGUgdGV4dCB0byByZXBsYWNlXG4qL1xuZnVuY3Rpb24gaW5pdGlhbEpQRmlsdGVyKHN0cmluZykge1xuICBjb25zdCBhcnIgPSBbXG4gICAgWycoWzAtOV0/WzAtOV0pW1xcXFx1NjVFNVxcXFx1NjY0MlxcXFx1NTIwNl1bXFxcXHU5NTkzXFxcXHU3NkVFXScsICcgJDEgJ10sIC8vIDPml6Xnm64sNOaXpemWkywz5pmC6ZaTLDI15YiG6ZaTXG4gICAgWycoWzAtOV0rKVxcXFx1NjVFNVxcXFx1OTAyM1xcXFx1N0Q5QScsICcgJDEgJ10sIC8vIDbml6XpgKPntppcbiAgICBbJ1swLTldXFxcXHU2NUU1KFswLTldKylcXFxcdTU2REUnLCAnICQxICddLCAvLyAx5pel77yR5ZueXG4gIF07XG5cbiAgcmV0dXJuIHJlcGxhY2VBbGxGcm9tQXJyYXkoYXJyLCBzdHJpbmcsICdnaScpO1xufVxuXG5cbmZ1bmN0aW9uIHJlcGxhY2VLYW5qaU51bXMocykge1xuICByZXR1cm4gc1xuICAgIC5yZXBsYWNlKC9cXHU1MzQxXFx1NEUwMC9nLCAnMTEnKVxuICAgIC5yZXBsYWNlKC9cXHU1MzQxXFx1NEU4Qy9nLCAnMTInKVxuICAgIC5yZXBsYWNlKC9cXHU1MzQxXFx1NEUwOS9nLCAnMTMnKVxuICAgIC5yZXBsYWNlKC9cXHU1MzQxXFx1NTZEQi9nLCAnMTQnKVxuICAgIC5yZXBsYWNlKC9cXHU1MzQxXFx1NEU5NC9nLCAnMTUnKVxuICAgIC5yZXBsYWNlKC9cXHU1MzQxXFx1NTE2RC9nLCAnMTYnKVxuICAgIC5yZXBsYWNlKC9cXHU1MzQxXFx1NEUwMy9nLCAnMTcnKVxuICAgIC5yZXBsYWNlKC9cXHU1MzQxXFx1NTE2Qi9nLCAnMTgnKVxuICAgIC5yZXBsYWNlKC9cXHU1MzQxXFx1NEU1RC9nLCAnMTknKVxuICAgIC5yZXBsYWNlKC9cXHU0RThDXFx1NTM0MS9nLCAnMjAnKVxuICAgIC5yZXBsYWNlKC9cXHVGRjEyfFxcdTRFOEMvZywgJzInKVxuICAgIC5yZXBsYWNlKC9cXHVGRjEzfFxcdTRFMDkvZywgJzMnKVxuICAgIC5yZXBsYWNlKC9cXHVGRjE0fFxcdTU2REIvZywgJzQnKVxuICAgIC5yZXBsYWNlKC9cXHVGRjE1fFxcdTRFOTQvZywgJzUnKVxuICAgIC5yZXBsYWNlKC9cXHVGRjE2fFxcdTUxNkQvZywgJzYnKVxuICAgIC5yZXBsYWNlKC9cXHVGRjE3fFxcdTRFMDMvZywgJzcnKVxuICAgIC5yZXBsYWNlKC9cXHVGRjE4fFxcdTUxNkIvZywgJzgnKVxuICAgIC5yZXBsYWNlKC9cXHVGRjE5fFxcdTRFNUQvZywgJzknKTtcbn1cblxuXG5mdW5jdGlvbiBjbGVhblN0cmluZ3NCZWZvcmVEYXRlQ2hlY2soc3JjKSB7XG4gIGxldCBzb3VyY2UgPSBzcmM7XG5cbiAgLy8gcmVwbGFjZSBhbGwgZG91YmxlLWJ5dGUgbnVtYmVycyB3aXRoIHNpbmdsZSBieXRlIHZlcnNpb25zXG4gIHNvdXJjZSA9IHJlcGxhY2VLYW5qaU51bXMoc291cmNlKTtcbiAgLy8gcmVtb3ZlIHN0cmluZ3MgdGhhdCBzaG91bGQgbmV2ZXIgYmUgaW50ZXJwcmV0ZWQgYXMgbnVtYmVyc1xuICBzb3VyY2UgPSBpbml0aWFsSlBGaWx0ZXIoc291cmNlKTtcbiAgLy8gcGFyc2UgYWxsIGRhdGVzIGludG8gdGhlIHsyMDE3LTktMjF9IGZvcm1hdFxuICAvLyBTdGlsbCBuZWVkIHRvIGNvbnZlcnQgdGhpbmdzIGludG8gMi1kaWdpdCBmb3JtYXRcbiAgc291cmNlID0gcmVwbGFjZUFsbEZyb21BcnJheShvRGF0ZUZvcm1hdHMsIHNvdXJjZSwgJ2dpJyk7XG5cbiAgcmV0dXJuIHNvdXJjZTtcbn1cblxuXG4vKiogUmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXMgdG8gdGhlIGdpdmVuIHJlZ2V4LlxuICogSWYgcGFzc2VkIGFuIGluaXRpYWwgYXJyYXksIGl0IHJldHVybnMgaXQgd2l0aCB0aGUgbmV3XG4gKiBtYXRjaGVzIHRhY2tlZCBvbiBhdCB0aGUgZW5kXG4gKiBOT1RFOiBUaGlzIGZ1bmN0aW9uIGN1cnJlbnRseSBhcHBlYXJzIHRvIGZhaWwgd2l0aCBsaXRlcmFsXG4gKiByZWdleCBjb25zdHJ1Y3RvcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBzZWFyY2hcbiAqIEBwYXJhbSB7UmVnRXhwfSByZWdleCAtIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gZXhlY3V0ZVxuICogQHBhcmFtIHthcnJheX0gYWNjdW11bGF0b3JBcnIgLSBBZGRzIHRoZSBtYXRjaGVzIHRvIHRoZSBhcnJheSBwcm92aWRlZFxuICogQHJldHVybnMgQW4gYXJyYXkgb2YgbWF0Y2hlcyBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hUb0FycmF5KHN0ciwgcmVnZXgsIGFjY3VtdWxhdG9yQXJyID0gW10pIHtcbiAgbGV0IG07XG4gIGRvIHtcbiAgICBtID0gcmVnZXguZXhlYyhzdHIpO1xuICAgIGlmIChtKSB7IGFjY3VtdWxhdG9yQXJyLnB1c2gobSk7IH1cbiAgfSB3aGlsZSAobSk7XG4gIHJldHVybiBhY2N1bXVsYXRvckFycjtcbn1cblxuXG4vKipcbiAqIEV4dHJhY3RzIGRhdGVzIGluIGEgc3BlY2lmaWVkIGZvcm1hdCBmcm9tIHR3byBzdHJpbmdzLCBhbmQgY29tcGFyZXMgdGhlIHJlc3VsdHMuXG4gKiBUaGUgZGF0ZXMgbXVzdCBhcHBlYXIgaW4gdGhlIGZvcm0ge1hYWFgtWFgtWFh9IG9yIHtYWFhYLVhYLVhYIEhIOk1NfS4gTW9udGhzIGNhbiBiZVxuICogc2luZ2xlLSBvciBkb3VibGUtZGlnaXRzLlxuICogQHBhcmFtIHtzdHJpbmd9IGNsZWFuU291cmNlIC0gU2VnbWVudCB0ZXh0IHdpdGggbmF0dXJhbCB0ZXh0IGRhdGVzIGNvbnZlcnRlZCBpbnRvIGJyYWNrZXQgZm9ybWF0LlxuICogQHBhcmFtIHtzdHJpbmd9IGNsZWFuVGFyZ2V0IC0gU2VnbWVudCB0ZXh0IHdpdGggbmF0dXJhbCB0ZXh0IGRhdGVzIGNvbnZlcnRlZCBpbnRvIGJyYWNrZXQgZm9ybWF0LlxuICogQHJldHVybnMgeyp9IFRoZSAwdGggZWxlbWVudCBpbiB0aGUgYXJyYXkgaXMgdGhlIHJlZ2V4IG1hdGNoZXMgZnJvbSB0aGUgc291cmNlIHRleHQuXG4gKiBUaGUgMXN0IGVsZW1lbnQgaW4gdGhlIGFycmF5IGlzIHRoZSByZWdleCBtYXRjaGVzIGZyb20gdGhlIHRhcmdldCB0ZXh0LlxuICogVGhlIDJuZCBlbGVtZW50IGluIHRoZSBhcnJheSBpcyBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSB0d28gYXJyYXlzIGFyZSBpZGVudGljYWwgb3Igbm90LlxuICovXG5mdW5jdGlvbiBleHRyYWN0RGF0ZXMoc291cmNlKSB7XG4gIGNvbnN0IHMgPSAne1swLTldezR9LVswLTFdP1swLTldLVswLTNdP1swLTldfXx7WzAtOV17NH0tWzAtMV0/WzAtOV0tWzAtM10/WzAtOV0gWzAtMl0/WzAtOV06WzAtNV1bMC05XVthcF0/W21dP30nO1xuICBjb25zdCByZSA9IG5ldyBSZWdFeHAocywgJ2dpJyk7XG5cbiAgLyogUGVyZm9ybSB0aGUgUmVnRXhwLmV4ZWMgdG8gZ2V0IHRoZSBtYXRjaGVzXG4gIC5tYXAgZGlzY2FyZHMgYWxsIHRoZSBtZXRhZGF0YSBhbmQgb25seSBsZWF2ZXMgdGhlIG1hdGNoZXMgKi9cbiAgcmV0dXJuIG1hdGNoVG9BcnJheShzb3VyY2UsIHJlKS5tYXAoeCA9PiB4WzBdKTtcbn1cblxuXG4vKipcbiAqIENvbnZlcnQgMTIgaG91ciBjbG9ja3MgdG8gMjQgaG91ciBjbG9ja3MuXG4gKiBAcGFyYW0geyp9IG1hdGNoIC0gUmVnRXhwIG1hdGNoIG9iamVjdFxuICogQHBhcmFtIHtOdW1iZXJ9IGhvdXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtaW51dGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVyaWRpYW4gLSBhbScgb3IgJ3BtJywgb3IgYW4gZW1wdHkgc3RyaW5nLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdHdlbnR5Rm91ckhvdXJzKG1hdGNoLCBob3VyLCBtaW51dGVzLCBtZXJpZGlhbiA9ICcnKSB7XG4gIGxldCBociA9IE51bWJlcihob3VyKTtcbiAgY29uc3QgbWluID0gTnVtYmVyKG1pbnV0ZXMpO1xuICBjb25zdCBtZXIgPSBtZXJpZGlhbi50b0xvd2VyQ2FzZSgpO1xuXG4gIGlmIChociA9PT0gMTIgJiYgbWVyID09PSAnYW0nKSB7XG4gICAgaHIgPSAwO1xuICB9XG4gIGlmIChociA8IDEyICYmIG1lciA9PT0gJ3BtJykge1xuICAgIGhyICs9IDEyO1xuICB9XG5cbiAgbGV0IHNIciA9IGhyLnRvU3RyaW5nKCk7XG4gIGxldCBzTWluID0gbWluLnRvU3RyaW5nKCk7XG5cbiAgaWYgKGhyIDwgMTApIHsgc0hyID0gYDAke3NIcn1gOyB9XG4gIGlmIChtaW4gPCAxMCkgeyBzTWluID0gYDAke3NNaW59YDsgfVxuXG4gIHJldHVybiBgJHtzSHJ9OiR7c01pbn1gO1xufVxuXG5cbi8qKlxuICogQ29udmVydHMgdGltZXMgaW4gdGhlIHRleHQgZnJvbSAxMiBob3VyIGZvcm1hdCBpbnRvIDI0IGhvdXIgZm9ybWF0LFxuICogYWNjb3VudGluZyBmb3IgXCJhbS9wbVwiIGltbWVkaWF0ZWx5IGZvbGxvd2luZyB0aGUgdGltZSBkaXNwbGF5LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIFRleHQgY29udGFpbmluZyB0aW1lc1xuICogQHJldHVybnMgQSBuZXcgc3RyaW5nIHdpdGggdGhlIHRpbWVzIHJlcGxhY2VkXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb252ZXJ0VG9Ud2VudHlGb3VySG91ckNsb2NrKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvKFswLTJdP1swLTldKTooWzAtNV1bMC05XSkoW2FwXW0pPy9naSwgdHdlbnR5Rm91ckhvdXJzKTtcbn1cblxuXG4vKipcbiAqIFBpcGVzIGEgc3RyaW5nIHRocm91Z2ggYSBzZXJpZXMgb2YgdHJhbnNmb3JtYXRpb25zIGFuZCBmaWx0ZXJzXG4gKiB0byByZWR1Y2UgaXQgZG93biB0byBhbiBhcnJheSBvZiBkYXRlcyBpbiB0aGUgezIwMTgtMDktMjF9IGZvcm1hdFxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgdGV4dCB0byBwYXJzZVxuICovXG5mdW5jdGlvbiBwYXJzZURhdGVzKHRleHQpIHtcbiAgY29uc3QgY2xlYW5lZCA9IGNsZWFuU3RyaW5nc0JlZm9yZURhdGVDaGVjayh0ZXh0KTtcbiAgY29uc3QgZXh0cmFjdGVkID0gZXh0cmFjdERhdGVzKGNsZWFuZWQpO1xuICBjb25zdCBpc29mb3JtYXR0ZWQgPSBleHRyYWN0ZWQubWFwKGNvbnZlcnRUb1R3ZW50eUZvdXJIb3VyQ2xvY2spO1xuICByZXR1cm4gaXNvZm9ybWF0dGVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJzZURhdGVzO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
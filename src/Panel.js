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

export default Panel;

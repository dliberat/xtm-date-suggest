/* global document */

import parseDates from './parseDates';

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
    const dates = parseDates(src.innerText);

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

export default TermList;

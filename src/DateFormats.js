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

export {
  basicShortMonth,
  basicLongMonth,
  shortMonthAMPM,
};

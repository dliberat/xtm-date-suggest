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
  ['[0-2]?[0-9]:[0-5][0-9]\\s?[-–\\uFF5E]\\s?([0-1]?[0-9])\\/([0-3]?[0-9]) ([0-2]?[0-9]:[0-5][0-9])', `{${thisYear}-$1-$2 $3}`], // 11:00 - 10/29 23:59
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

export default parseDates;

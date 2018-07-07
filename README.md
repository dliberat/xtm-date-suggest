[![Build Status](https://travis-ci.com/garroadran/xtm-date-suggest.svg?branch=master)](https://travis-ci.com/garroadran/xtm-date-suggest)
[![codecov](https://codecov.io/gh/garroadran/xtm-date-suggest/branch/master/graph/badge.svg)](https://codecov.io/gh/garroadran/xtm-date-suggest)

# XTM Date Autosuggest

### Overview

When working with a team of translators, or with multiple independent translators, it can be difficult
to have everyone adhere to style restrictions. Computer Assisted Translation (CAT) tools such as [XTM](https://xtm.cloud/)
can help, but rarely provide sufficient support for translators to ensure that they stick to the
required text formats.

Fortunately, if there is not too much variation in the way that certain elements of the source language
are written, it is frequently possible to isolate them without needing to resort to hefty natural language
processing engines.

This demo shows how it is possible to inject a script into an XTM editor window that will:

1. Identify dates and times written in Japanese
2. Convert those times into a specific English format (e.g., "January 23, 2019" or "01/23")
3. Suggest the formatted date to the translator as he/she works in the editor
4. Allow the translator to input the formatted date at the click of a button.

### Demo

A demo of the content script is available on the `dist/index.html` page. You can try it out for yourself [here](https://xtm-autosuggest-dates.herokuapp.com/) (Please note that it may take up to 1 minute to load).

Make sure you load the demo page on Google Chrome and that you have JavaScript unblocked.

__Using the demo:__
1. Try inputting text into the first segment. Nothing special will happen because there are no dates in the Japanese text.
2. On the second segment, start typing the letter "J". You will see the autosuggest pop-up appear. You can press Tab to automatically insert the suggested text.
3. The third and fourth segments feature times. Since both segments have date/times that start with the hour 10, you can trigger the suggestion pop-up by typing in the number 1.
4. Select a different date format from the drop-down menu at the top left and try steps 2 and 3 again to see the suggestions change.

### Notes

This script was designed to work as a browser extension for Chrome (version > 65), and is not guaranteed to work with other browsers.
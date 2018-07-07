[![Build Status](https://travis-ci.com/garroadran/xtm-date-suggest.svg?branch=master)](https://travis-ci.com/garroadran/xtm-date-suggest)

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


### Notes:

1. The page at `dist/index.html` provides a working demo of the content script.
2. This script was designed to work as a browser extension for Chrome (version > 65), and is not guaranteed to work with other browsers.
/**
 * Encode percent-encoding
 * @license CC0-1.0
 * @version 0.0.1
 */
// The C0 control percent-encode set are the C0 controls and all code points greater than U+007E (~).
// The fragment percent-encode set is the C0 control percent-encode set and U+0020 SPACE, U+0022 ("), U+003C (<), U+003E (>), and U+0060 (`).
// The query percent-encode set is the C0 control percent-encode set and U+0020 SPACE, U+0022 ("), U+0023 (#), U+003C (<), and U+003E (>).
// The special-query percent-encode set is the query percent-encode set and U+0027 (').
// The path percent-encode set is the query percent-encode set and U+003F (?), U+0060 (`), U+007B ({), and U+007D (}).
// The userinfo percent-encode set is the path percent-encode set and U+002F (/), U+003A (:), U+003B (;), U+003D (=), U+0040 (@), U+005B ([) to U+005E (^), inclusive, and U+007C (|).
// The component percent-encode set is the userinfo percent-encode set and U+0024 ($) to U+0026 (&), inclusive, U+002B (+), and U+002C (,).

var FRAGMENT_SET = " \"<>`";
var QUERY_SET = " \"#<>";
var SPECIAL_QUERY_SET = " \"#<>'";
var PATH_SET = " \"#<>?`{}";
var USERINFO_SET = " \"#<>?`{}/:;=@[\\]^|";
var COMPONENT_SET = " \"#<>?`{}/:;=@[\\]^|$%&+,";

const RE_RANGE_ESCAPE_MAP = {
    "\x00": "\\x00",
    "\x01": "\\x01",
    "\x02": "\\x02",
    "\x03": "\\x03",
    "\x04": "\\x04",
    "\x05": "\\x05",
    "\x06": "\\x06",
    "\x07": "\\x07",
    "\x08": "\\b", // BS
    "\x09": "\\t", // HT(TAB)
    "\x0a": "\\n", // LF
    "\x0b": "\\v", // VT
    "\x0c": "\\f", // FF
    "\x0d": "\\r", // CR
    "\x0e": "\\x0e",
    "\x0f": "\\x0f",
    "\x10": "\\x10",
    "\x11": "\\x11",
    "\x12": "\\x12",
    "\x13": "\\x13",
    "\x14": "\\x14",
    "\x15": "\\x15",
    "\x16": "\\x16",
    "\x17": "\\x17",
    "\x18": "\\x18",
    "\x19": "\\x19",
    "\x1a": "\\x1a",
    "\x1b": "\\x1b",
    "\x1c": "\\x1c",
    "\x1d": "\\x1d",
    "\x1e": "\\x1e",
    "\x1f": "\\x1f",
    "-": "\\-",
    "/": "\\/",
    "[": "\\[",
    "\\": "\\\\",
    "]": "\\]",
    "^": "\\^"
};

/**
 * Escape RegExp range character.
 * @param {string} c character
 * @returns {string} escaped character
 */
function escapeReRangeChar(c) {
    return RE_RANGE_ESCAPE_MAP[c];
}

/**
 * Escape RegExp range string.
 * @param {string} c character
 * @returns {string} escaped character
 */
function escapeReRange(s) {
    // eslint-disable-next-line no-control-regex
    return s.replace(/[\x00-\x1f\-\/\[\\\]^]/g, escapeReRangeChar);
}

function encodePercentChar(c) {
    var code = c.charCodeAt(0);
    if (code < 0x20 || code > 0x7f) {
        return encodeURIComponent(c); // ECMA-262 3rd
    }
    return "%" + code.toString(16).toUpperCase();
}

var reCache = {};

function encodePercent(s, encodingChars) {
    if (!encodingChars) {
        encodingChars = COMPONENT_SET;
    }
    var re = reCache[encodingChars];
    if (!re) {
        re = new RegExp("[\uD800-\uDBFF][\uDC00-\uDFFF]|[\x00-\x1F" + escapeReRange(encodingChars) + "\u007F-\uD7FF\uE000-\uFFFF]", "g");
        reCache[encodingChars] = re;
    }
    return s.replace(re, encodePercentChar);
}

module.exports = {
    "FRAGMENT_SET": FRAGMENT_SET,
    "QUERY_SET": QUERY_SET,
    "SPECIAL_QUERY_SET": SPECIAL_QUERY_SET,
    "PATH_SET": PATH_SET,
    "USERINFO_SET": USERINFO_SET,
    "COMPONENT_SET": COMPONENT_SET,
    "encodePercent": encodePercent
};

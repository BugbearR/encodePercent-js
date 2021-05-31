# encodePercent-js
Encode percent-encoding

encodeURIComponent() can't specify encoding chars.

encodePercent(s: string, encodingChars: string): string;

```
// const EncodePercent = require("@bugbearr/encodepercent");
import EncodePercent from "@bugbearr/encodepercent";

var uriComponentStr = EncodePercent.encodePercent(
    " !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~");
console.log(uriComponentStr);
// %20!%22%23%24%25%26'()*%2B%2C-.%2F0123456789%3A%3B%3C%3D%3E%3F%40ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D~

// var FRAGMENT_SET = " \"<>`";
// var QUERY_SET = " \"#<>";
// var SPECIAL_QUERY_SET = " \"#<>'";
// var PATH_SET = " \"#<>?`{}";
// var USERINFO_SET = " \"#<>?`{}/:;=@[\\]^|";
// var COMPONENT_SET = " \"#<>?`{}/:;=@[\\]^|$%&+,";
// var RFC5987_VALUE_CHARS_SET = " \"'()*,/:;<=>?@[\\]{}";
// var RFC8187_VALUE_CHARS_SET = " \"'()*,/:;<=>?@[\\]{}";

var uriComponentStr = EncodePercent.encodePercent(
    " !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~", EncodePercent.FRAGMENT_SET);
console.log(uriComponentStr);
// %20!%22#$%&'()*+,-./0123456789:;%3C=%3E?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_%60abcdefghijklmnopqrstuvwxyz{|}~
```

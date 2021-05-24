var EncodePercent = require("../index");
var ASCII_SET = String.fromCharCode.apply(null, (function(){
    var a = new Array(128);
    for (var i = 0; i < 128; i++) {
        a[i] = i;
    }
    return a;
})());

test("input: \"\\x00\"", () => {
    expect(EncodePercent.encodePercent("\x00")).toBe("%00");
});

test("input: \"\\x1f\"", () => {
    expect(EncodePercent.encodePercent("\x1f")).toBe("%1F");
});

test("input: \" \"", () => {
    expect(EncodePercent.encodePercent(" ")).toBe("%20");
});

test("input: \"!\"", () => {
    expect(EncodePercent.encodePercent("!")).toBe("!");
});

test("input: \"~\"", () => {
    expect(EncodePercent.encodePercent("~")).toBe("~");
});

test("input: \"\\x7F\"", () => {
    expect(EncodePercent.encodePercent("\x7F")).toBe("%7F");
});

test("input: \"\\uD7FF\"", () => {
    expect(EncodePercent.encodePercent("\uD7FF")).toBe("%ED%9F%BF");
});

test("input: \"\\uD800\\uDC00\"", () => {
    expect(EncodePercent.encodePercent("\uD800\uDC00")).toBe("%F0%90%80%80");
});

test("input: \"\\uDBFF\\uDFFF\"", () => {
    expect(EncodePercent.encodePercent("\uDBFF\uDFFF")).toBe("%F4%8F%BF%BF");
});

test("input: \"\\uE000\"", () => {
    expect(EncodePercent.encodePercent("\uE000")).toBe("%EE%80%80");
});

test("input: \"\\uFFFF\"", () => {
    expect(EncodePercent.encodePercent("\uFFFF")).toBe("%EF%BF%BF");
});

test("input: ASCII, FRAGMENT_SET", () => {
    expect(EncodePercent.encodePercent(ASCII_SET, EncodePercent.FRAGMENT_SET)).toBe("%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F%20!%22#$%&'()*+,-./0123456789:;%3C=%3E?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_%60abcdefghijklmnopqrstuvwxyz{|}~%7F");
});

test("input: ASCII, QUERY_SET", () => {
    expect(EncodePercent.encodePercent(ASCII_SET, EncodePercent.QUERY_SET)).toBe("%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F%20!%22%23$%&'()*+,-./0123456789:;%3C=%3E?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~%7F");
});

test("input: ASCII, SPECIAL_QUERY_SET", () => {
    expect(EncodePercent.encodePercent(ASCII_SET, EncodePercent.SPECIAL_QUERY_SET)).toBe("%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F%20!%22%23$%&%27()*+,-./0123456789:;%3C=%3E?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~%7F");
});

test("input: ASCII, PATH_SET", () => {
    expect(EncodePercent.encodePercent(ASCII_SET, EncodePercent.PATH_SET)).toBe("%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F%20!%22%23$%&'()*+,-./0123456789:;%3C=%3E%3F@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_%60abcdefghijklmnopqrstuvwxyz%7B|%7D~%7F");
});

test("input: ASCII, USERINFO_SET", () => {
    expect(EncodePercent.encodePercent(ASCII_SET, EncodePercent.USERINFO_SET)).toBe("%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F%20!%22%23$%&'()*+,-.%2F0123456789%3A%3B%3C%3D%3E%3F%40ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D~%7F");
});

test("input: ASCII, COMPONENT_SET", () => {
    expect(EncodePercent.encodePercent(ASCII_SET, EncodePercent.COMPONENT_SET)).toBe("%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F%20!%22%23%24%25%26'()*%2B%2C-.%2F0123456789%3A%3B%3C%3D%3E%3F%40ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D~%7F");
});

test("input: ASCII, default(COMPONENT_SET)", () => {
    expect(EncodePercent.encodePercent(ASCII_SET)).toBe("%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F%20!%22%23%24%25%26'()*%2B%2C-.%2F0123456789%3A%3B%3C%3D%3E%3F%40ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D~%7F");
});

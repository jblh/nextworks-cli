"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = Table;
exports.TableHeader = TableHeader;
exports.TableBody = TableBody;
exports.TableRow = TableRow;
exports.TableHead = TableHead;
exports.TableCell = TableCell;
exports.TableCaption = TableCaption;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../lib/utils");
function Table(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "relative w-full overflow-auto", children: (0, jsx_runtime_1.jsx)("table", Object.assign({ className: (0, utils_1.cn)("w-full caption-bottom text-sm", 
            // Optional fg override
            "text-[var(--table-fg)]", className) }, props)) }));
}
function TableHeader(props) {
    return ((0, jsx_runtime_1.jsx)("thead", Object.assign({ className: (0, utils_1.cn)("[&_tr]:border-b", 
        // Variable hooks for border color and head text
        "text-[var(--table-head-fg)] [&_tr]:border-[var(--table-border)]") }, props)));
}
function TableBody(props) {
    return ((0, jsx_runtime_1.jsx)("tbody", Object.assign({ className: (0, utils_1.cn)("[&_tr:last-child]:border-0", "[&_tr]:border-[var(--table-border)]") }, props)));
}
function TableRow(props) {
    return ((0, jsx_runtime_1.jsx)("tr", Object.assign({ className: (0, utils_1.cn)("hover:bg-muted/50 border-b transition-colors", "border-[var(--table-border)] hover:bg-[var(--table-row-hover-bg)]") }, props)));
}
function TableHead(props) {
    return ((0, jsx_runtime_1.jsx)("th", Object.assign({ className: (0, utils_1.cn)("text-muted-foreground h-10 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0", "text-[var(--table-head-fg)]") }, props)));
}
function TableCell(props) {
    return ((0, jsx_runtime_1.jsx)("td", Object.assign({ className: (0, utils_1.cn)("p-4 align-middle [&:has([role=checkbox])]:pr-0", "text-[var(--table-fg)]") }, props)));
}
function TableCaption(props) {
    return ((0, jsx_runtime_1.jsx)("caption", Object.assign({ className: (0, utils_1.cn)("text-muted-foreground mt-4 text-sm", "text-[var(--table-muted-fg)]") }, props)));
}

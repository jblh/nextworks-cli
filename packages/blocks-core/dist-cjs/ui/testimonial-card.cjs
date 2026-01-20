"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialCard = TestimonialCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../lib/utils");
function getInitials(from) {
    var _a, _b;
    if (!from)
        return undefined;
    const parts = from.trim().split(/\s+/);
    const first = ((_a = parts[0]) === null || _a === void 0 ? void 0 : _a[0]) || "";
    const last = parts.length > 1 ? ((_b = parts[parts.length - 1]) === null || _b === void 0 ? void 0 : _b[0]) || "" : "";
    const res = `${first}${last}`.toUpperCase();
    return res || undefined;
}
function TestimonialCard({ id, className, 
// legacy defaults
testimonialText = "Lorem ipsum dolor sit amet! Consectetur adipiscing elit.", testimonialAuthor = " - Cillum Dolore", testimonialAuthorInitials = "JD", 
// new props (no defaults, we derive below)
quote, name, role, card = {
    className: "bg-card text-card-foreground p-6 rounded-lg border border-border shadow-md transition-transform duration-200 hover:-translate-y-1 bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)] shadow-[var(--card-shadow)]",
}, content = {
    className: "flex flex-col space-y-4",
}, text = {
    className: "text-muted-foreground text-base leading-relaxed italic text-[var(--card-fg)]",
}, author = {
    className: "text-muted-foreground text-sm font-medium text-[var(--card-muted-fg)]",
}, avatar = {
    className: "w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold bg-[var(--badge-bg)] text-[var(--badge-fg)] border-[var(--badge-border)]",
}, avatarText = {
    className: "text-white font-bold",
}, }) {
    var _a;
    const displayText = quote !== null && quote !== void 0 ? quote : testimonialText;
    const computedAuthor = testimonialAuthor !== null && testimonialAuthor !== void 0 ? testimonialAuthor : (name ? ` - ${name}${role ? `, ${role}` : ""}` : " - Cillum Dolore");
    const initials = (_a = testimonialAuthorInitials !== null && testimonialAuthorInitials !== void 0 ? testimonialAuthorInitials : getInitials(name)) !== null && _a !== void 0 ? _a : "JD";
    return ((0, jsx_runtime_1.jsx)("div", { id: id, className: (0, utils_1.cn)(card.className, className), children: (0, jsx_runtime_1.jsxs)("div", { className: content.className, children: [(0, jsx_runtime_1.jsx)("div", { className: avatar.className, children: (0, jsx_runtime_1.jsx)("span", { className: avatarText.className, children: initials }) }), (0, jsx_runtime_1.jsxs)("p", { className: text.className, children: ["\u201C", displayText, "\u201D"] }), (0, jsx_runtime_1.jsx)("p", { className: author.className, children: computedAuthor })] }) }));
}

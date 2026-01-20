"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandNodes = void 0;
exports.BrandNodeIconBadge = BrandNodeIconBadge;
exports.BrandNodeGradientRing = BrandNodeGradientRing;
exports.BrandNodeGeometricMark = BrandNodeGeometricMark;
exports.BrandNodeEmojiBadge = BrandNodeEmojiBadge;
exports.BrandNodeDiagonalAppIcon = BrandNodeDiagonalAppIcon;
exports.BrandNodeCubeOutline = BrandNodeCubeOutline;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("../lib/utils");
function BrandNodeIconBadge({ className, icon: Icon = lucide_react_1.Sparkles, iconClassName = "h-4 w-4", }) {
    const base = "grid h-8 w-8 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/30 text-primary";
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(base, className), "aria-label": "Brand icon badge", children: (0, jsx_runtime_1.jsx)(Icon, { className: iconClassName }) }));
}
function BrandNodeGradientRing({ className, gradient = "conic-gradient(hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))", innerBgClassName = "h-full w-full rounded-full bg-background", }) {
    const base = "relative h-8 w-8";
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(base, className), "aria-label": "Brand gradient ring", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 rounded-full p-[2px]", style: { background: gradient }, children: (0, jsx_runtime_1.jsx)("div", { className: innerBgClassName }) }) }));
}
function BrandNodeGeometricMark({ className }) {
    const base = "grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-primary/10 to-accent/10 ring-1 ring-border";
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(base, className), "aria-label": "Brand geometric mark", children: (0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 24 24", className: "fill-primary h-4 w-4", children: (0, jsx_runtime_1.jsx)("path", { d: "M12 4l8 14H4l8-14z" }) }) }));
}
function BrandNodeEmojiBadge({ className, emoji = "⚡", }) {
    const base = "grid h-8 w-8 place-items-center rounded-md bg-card/60 backdrop-blur ring-1 ring-border";
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(base, className), "aria-label": "Brand emoji badge", children: (0, jsx_runtime_1.jsx)("span", { className: "text-base", "aria-hidden": true, children: emoji }) }));
}
function BrandNodeDiagonalAppIcon({ className, baseColorClass = "bg-primary", overlayColorClass = "bg-accent", }) {
    const base = "relative h-8 w-8 overflow-hidden rounded-md ring-1 ring-black/5 dark:ring-white/10";
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)(base, className), "aria-label": "Brand diagonal app icon", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("absolute inset-0", baseColorClass) }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("absolute inset-0 translate-y-1/3 -skew-y-12", overlayColorClass) })] }));
}
function BrandNodeCubeOutline({ className }) {
    const base = "grid h-8 w-8 place-items-center rounded-md bg-foreground text-background ring-1 ring-border";
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(base, className), "aria-label": "Brand cube outline", children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 2l8 4.5v9L12 20 4 15.5v-9L12 2z", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 20v-9M4 6l8 5 8-5", fill: "none", stroke: "currentColor", strokeWidth: "1.6" })] }) }));
}
/** Registry for quick swapping by name */
exports.BrandNodes = {
    IconBadge: BrandNodeIconBadge,
    GradientRing: BrandNodeGradientRing,
    GeometricMark: BrandNodeGeometricMark,
    EmojiBadge: BrandNodeEmojiBadge,
    DiagonalAppIcon: BrandNodeDiagonalAppIcon,
    CubeOutline: BrandNodeCubeOutline,
};

"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureCard = FeatureCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const card_1 = require("../ui/card");
const utils_1 = require("../lib/utils");
function FeatureCard({ id, className, cardImageSrc, cardImageAlt, cardHeadingText, cardSubheadingText, card = {
    className: "h-full transition-all duration-200 hover:shadow-lg bg-card text-card-foreground border rounded-md border-border",
}, image = { className: "object-cover" }, heading = {
    className: "mb-2 text-lg font-semibold text-foreground text-[var(--card-title-fg)]",
}, subheading = {
    className: "text-sm leading-relaxed text-muted-foreground text-[var(--card-muted-fg)]",
}, imageQuality = 85, imageSizes = "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw", }) {
    return ((0, jsx_runtime_1.jsx)(card_1.Card, { id: id, className: (0, utils_1.cn)("group", card.className, className), children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "relative flex h-full flex-col p-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl dark:bg-white/10" }) }), (0, jsx_runtime_1.jsx)("div", { className: "relative mb-4 h-48 w-full overflow-hidden rounded-md", children: cardImageSrc ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: cardImageSrc, alt: cardImageAlt || "Feature image", fill: true, className: (0, utils_1.cn)("transition-transform duration-500 group-hover:scale-105", image.className), quality: imageQuality, sizes: imageSizes })) : ((0, jsx_runtime_1.jsx)("div", { className: "bg-muted text-muted-foreground flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs", children: "No image" }) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("h3", { className: heading.className, children: cardHeadingText }), (0, jsx_runtime_1.jsx)("p", { className: subheading.className, children: cardSubheadingText })] })] }) }));
}

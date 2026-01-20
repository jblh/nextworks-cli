"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingCard = PricingCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const button_1 = require("../ui/button");
const card_1 = require("../ui/card");
const utils_1 = require("../lib/utils");
const lucide_react_1 = require("lucide-react");
function PricingCard({ id, className, pricingCardTitle = "Basic Plan", pricingCardPrice = "$9.99", pricingCardFeatures = ["Feature 1", "Feature 2", "Feature 3"], pricingCardCTALabel = "Select Plan", pricingCardCTAHref = "#contact", isPopular = false, card = {
    className: "relative bg-card text-card-foreground border border-border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200",
}, header = { className: "p-6 text-center border-b border-border" }, title = { className: "text-xl font-bold text-foreground mb-2" }, price = { className: "text-3xl font-bold text-foreground mb-4" }, features = { className: "p-6 space-y-3" }, featureItem = {
    className: "flex items-center text-muted-foreground text-sm",
}, cta = {
    variant: "default",
    size: "lg",
    className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5",
}, popularBadge = {
    className: "absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium",
}, }) {
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { id: id, className: (0, utils_1.cn)(card.className, className, "rounded-lg"), children: [isPopular && (0, jsx_runtime_1.jsx)("div", { className: popularBadge.className, children: "Most Popular" }), (0, jsx_runtime_1.jsxs)("div", { className: header.className, children: [(0, jsx_runtime_1.jsx)("h3", { className: title.className, children: pricingCardTitle }), (0, jsx_runtime_1.jsx)("div", { className: price.className, children: pricingCardPrice })] }), (0, jsx_runtime_1.jsx)("div", { className: features.className, children: pricingCardFeatures === null || pricingCardFeatures === void 0 ? void 0 : pricingCardFeatures.map((feature, index) => ((0, jsx_runtime_1.jsxs)("div", { className: featureItem.className, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: "mr-3 h-4 w-4 flex-shrink-0 text-green-500" }), (0, jsx_runtime_1.jsx)("span", { children: feature })] }, index))) }), (0, jsx_runtime_1.jsx)("div", { className: "p-6 pt-0", children: (0, jsx_runtime_1.jsx)(button_1.Button, Object.assign({ asChild: true, variant: cta.variant, size: cta.size, className: (0, utils_1.cn)(
                    // Allow presets to take over with var hooks from Button
                    "border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]", cta.className, "hover:animate-none motion-safe:animate-none") }, (cta.unstyled ? { unstyled: true } : {}), { style: cta.style, children: (0, jsx_runtime_1.jsx)(link_1.default, { href: pricingCardCTAHref || "#", children: pricingCardCTALabel }) })) })] }));
}

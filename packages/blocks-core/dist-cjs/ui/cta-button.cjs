"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTAButton = CTAButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const button_1 = require("../ui/button");
const utils_1 = require("../lib/utils");
function CTAButton({ id, className, onClick, ctaButtonLabel = "Get Started", ctaButtonHref = "#contact", ctaButtonTextColor, ctaButtonBgColor, ctaButtonBorderColor, ctaButtonDarkMode, ctaButtonHoverStyle, button = {
    variant: "default",
    size: "lg",
    className: "bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5",
}, }) {
    if (!ctaButtonLabel)
        return null;
    // Build dynamic classes from deprecated style props (kept for compatibility)
    const dynamic = [];
    if (ctaButtonTextColor)
        dynamic.push(`text-${ctaButtonTextColor}`);
    if (ctaButtonBgColor)
        dynamic.push(`bg-${ctaButtonBgColor}`);
    if (ctaButtonBorderColor)
        dynamic.push(`border-${ctaButtonBorderColor}`);
    if (ctaButtonHoverStyle) {
        const { color, bg, borderColor, transform, boxShadow } = ctaButtonHoverStyle;
        if (color)
            dynamic.push(`hover:text-${color}`);
        if (bg)
            dynamic.push(`hover:bg-${bg}`);
        if (borderColor)
            dynamic.push(`hover:border-${borderColor}`);
        if (transform)
            dynamic.push(`hover:${transform}`);
        if (boxShadow)
            dynamic.push(`hover:${boxShadow}`);
    }
    if (ctaButtonDarkMode) {
        const { color, bg, borderColor } = ctaButtonDarkMode;
        if (color)
            dynamic.push(`dark:text-${color}`);
        if (bg)
            dynamic.push(`dark:bg-${bg}`);
        if (borderColor)
            dynamic.push(`dark:border-${borderColor}`);
    }
    const finalClassName = (0, utils_1.cn)(
    // Allow var hooks to flow through to Button
    "border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]", button.className, className, dynamic.join(" "));
    return ((0, jsx_runtime_1.jsx)(button_1.Button, Object.assign({ asChild: true, variant: button.variant, size: button.size, className: finalClassName }, (button.unstyled ? { unstyled: true } : {}), { style: button.style, children: (0, jsx_runtime_1.jsx)(link_1.default, { id: id, href: ctaButtonHref || "#", onClick: onClick, "aria-label": ctaButtonLabel, children: ctaButtonLabel }) })));
}

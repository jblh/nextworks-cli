"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialThemeFromCookies = getInitialThemeFromCookies;
const jsx_runtime_1 = require("react/jsx-runtime");
const headers_1 = require("next/headers");
const themes_1 = require("../lib/themes");
function toCssVars(colors) {
    return Object.entries(colors)
        .map(([key, value]) => `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`)
        .join("");
}
function safeParseCustomTokens(value) {
    if (!value)
        return null;
    try {
        return JSON.parse(decodeURIComponent(value));
    }
    catch (_a) {
        return null;
    }
}
/**
 * Server-only: reads cookies and returns initial theme variant + a <style> tag
 * that sets CSS variables for :root and .dark.
 *
 * No next/font usage here (Turbopack-safe).
 */
async function getInitialThemeFromCookies() {
    var _a, _b;
    const cookieStore = await (0, headers_1.cookies)();
    const cookieVariant = (_a = cookieStore.get("theme-variant")) === null || _a === void 0 ? void 0 : _a.value;
    const variant = cookieVariant && cookieVariant in themes_1.themes ? cookieVariant : "default";
    const cookieCustom = variant === "custom"
        ? safeParseCustomTokens((_b = cookieStore.get("theme-custom")) === null || _b === void 0 ? void 0 : _b.value)
        : null;
    const baseLight = themes_1.themes[variant].colors;
    const baseDark = themes_1.darkThemes[variant].colors;
    const lightMerged = cookieCustom ? Object.assign(Object.assign({}, baseLight), cookieCustom) : baseLight;
    const darkMerged = cookieCustom ? Object.assign(Object.assign({}, baseDark), cookieCustom) : baseDark;
    const lightVars = toCssVars(lightMerged);
    const darkVars = toCssVars(darkMerged);
    const inlineThemeCss = `:root{${lightVars}}.dark{${darkVars}}`;
    return {
        variant,
        styleTag: ((0, jsx_runtime_1.jsx)("style", { id: "theme-variant-vars", dangerouslySetInnerHTML: { __html: inlineThemeCss } })),
    };
}

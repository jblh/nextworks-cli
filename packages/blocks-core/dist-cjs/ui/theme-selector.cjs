"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.ThemeSelector = ThemeSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const next_themes_1 = require("next-themes");
const enhanced_theme_provider_1 = require("../components/enhanced-theme-provider");
const themes_1 = require("../lib/themes");
const button_1 = require("../ui/button");
const dropdown_menu_1 = require("../ui/dropdown-menu");
function ThemeSelector(_a) {
    var _b, _c, _d;
    var { ariaLabel = "Demo: Color theme", label = "Theme", className } = _a, buttonProps = __rest(_a, ["ariaLabel", "label", "className"]);
    const { theme, setTheme } = (0, next_themes_1.useTheme)();
    const { themeVariant, setThemeVariant, setCustomBrandColors } = (0, enhanced_theme_provider_1.useThemeVariant)();
    const isDark = theme === "dark";
    const [showCustom, setShowCustom] = React.useState(false);
    const [custom, setCustom] = React.useState({});
    function openCustomDialog() {
        setCustom({});
        setShowCustom(true);
    }
    function applyCustom() {
        setCustomBrandColors(custom);
        document.cookie = `theme-variant=custom; Path=/; Max-Age=31536000; SameSite=Lax`;
        document.cookie = `theme-custom=${encodeURIComponent(JSON.stringify(custom))}; Path=/; Max-Age=31536000; SameSite=Lax`;
        setShowCustom(false);
    }
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, Object.assign({ variant: "outline", size: "sm", className: `gap-2 ${className !== null && className !== void 0 ? className : ""}`, "aria-label": ariaLabel }, buttonProps, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Palette, { className: "h-4 w-4" }), label] })) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { align: "end", className: "w-64", children: [(0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuLabel, { className: "space-y-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { children: "Color theme variants" }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "border-border bg-muted/50 text-muted-foreground rounded-md border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase", children: "Gallery" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground text-xs", children: "Affects this preview only ( button is not part of the shared Navbar. )" })] }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}), Object.entries(themes_1.themes).map(([key, themeConfig]) => ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { onClick: () => {
                            setThemeVariant(key);
                            document.cookie = `theme-variant=${key}; Path=/; Max-Age=31536000; SameSite=Lax`;
                        }, className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-4 rounded-full border", style: {
                                            backgroundColor: isDark
                                                ? themes_1.darkThemes[key].colors.primary
                                                : themeConfig.colors.primary,
                                        } }), themeConfig.name] }), themeVariant === key && (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: "h-4 w-4" })] }, key))), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuLabel, { children: "Custom" }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { onClick: openCustomDialog, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Wrench, { className: "h-4 w-4" }), "Customize brand colors\u2026"] }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuLabel, { children: "Appearance" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setTheme("light"), children: "Light" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setTheme("dark"), children: "Dark" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => setTheme("system"), children: "System" })] }), showCustom && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4", children: (0, jsx_runtime_1.jsxs)("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "customBrandColorsTitle", className: "bg-popover text-popover-foreground w-full max-w-md rounded-md border p-4 shadow-lg", children: [(0, jsx_runtime_1.jsx)("div", { id: "customBrandColorsTitle", className: "mb-3 text-sm font-semibold", children: "Custom brand colors" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("label", { className: "w-28 text-sm", children: "primary" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "oklch(...) or #hex", className: "bg-background flex-1 rounded border p-2 text-sm", value: (_b = custom.primary) !== null && _b !== void 0 ? _b : "", onChange: (e) => setCustom((c) => (Object.assign(Object.assign({}, c), { primary: e.target.value }))) }), (0, jsx_runtime_1.jsx)("input", { type: "color", className: "h-8 w-10 cursor-pointer", value: typeof custom.primary === "string" &&
                                                custom.primary.startsWith("#")
                                                ? custom.primary
                                                : "#000000", onChange: (e) => setCustom((c) => (Object.assign(Object.assign({}, c), { primary: e.target.value }))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("label", { className: "w-28 text-sm", children: "accent" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "oklch(...) or #hex", className: "bg-background flex-1 rounded border p-2 text-sm", value: (_c = custom.accent) !== null && _c !== void 0 ? _c : "", onChange: (e) => setCustom((c) => (Object.assign(Object.assign({}, c), { accent: e.target.value }))) }), (0, jsx_runtime_1.jsx)("input", { type: "color", className: "h-8 w-10 cursor-pointer", value: typeof custom.accent === "string" &&
                                                custom.accent.startsWith("#")
                                                ? custom.accent
                                                : "#000000", onChange: (e) => setCustom((c) => (Object.assign(Object.assign({}, c), { accent: e.target.value }))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("label", { className: "w-28 text-sm", children: "ring" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "oklch(...) or #hex", className: "bg-background flex-1 rounded border p-2 text-sm", value: (_d = custom.ring) !== null && _d !== void 0 ? _d : "", onChange: (e) => setCustom((c) => (Object.assign(Object.assign({}, c), { ring: e.target.value }))) }), (0, jsx_runtime_1.jsx)("input", { type: "color", className: "h-8 w-10 cursor-pointer", value: typeof custom.ring === "string" &&
                                                custom.ring.startsWith("#")
                                                ? custom.ring
                                                : "#000000", onChange: (e) => setCustom((c) => (Object.assign(Object.assign({}, c), { ring: e.target.value }))) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 flex justify-end gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", onClick: () => setShowCustom(false), children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", onClick: applyCustom, children: "Apply" })] })] }) }))] }));
}

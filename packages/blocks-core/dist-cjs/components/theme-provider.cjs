"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeProvider = ThemeProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_themes_1 = require("next-themes");
function ThemeProvider({ children, attribute = "class", defaultTheme = "system", enableSystem = true, disableTransitionOnChange = false, }) {
    return ((0, jsx_runtime_1.jsx)(next_themes_1.ThemeProvider, { attribute: attribute, defaultTheme: defaultTheme, enableSystem: enableSystem, disableTransitionOnChange: disableTransitionOnChange, children: children }));
}

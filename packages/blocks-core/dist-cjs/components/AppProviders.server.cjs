"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppProviders;
const jsx_runtime_1 = require("react/jsx-runtime");
const BlocksAppProviders_1 = require("../providers/BlocksAppProviders");
const theme_vars_1 = require("../server/theme-vars");
async function AppProviders({ children, }) {
    const { variant, styleTag } = await (0, theme_vars_1.getInitialThemeFromCookies)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [styleTag, (0, jsx_runtime_1.jsx)("div", { className: "antialiased", children: (0, jsx_runtime_1.jsx)(BlocksAppProviders_1.BlocksAppProviders, { defaultThemeVariant: variant, children: children }) })] }));
}

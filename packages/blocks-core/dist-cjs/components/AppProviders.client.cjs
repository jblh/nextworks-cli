"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppProvidersClient;
const jsx_runtime_1 = require("react/jsx-runtime");
const BlocksAppProviders_1 = require("../providers/BlocksAppProviders");
/**
 * Client-safe AppProviders for Pages Router.
 *
 * Unlike the App Router server variant, this version does not read cookies
 * or inject server-rendered theme CSS.
 */
function AppProvidersClient({ children, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "antialiased", children: (0, jsx_runtime_1.jsx)(BlocksAppProviders_1.BlocksAppProviders, { children: children }) }));
}

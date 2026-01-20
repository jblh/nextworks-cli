"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocksAppProviders = BlocksAppProviders;
const jsx_runtime_1 = require("react/jsx-runtime");
const enhanced_theme_provider_1 = require("../components/enhanced-theme-provider");
/**
 * Client-safe provider wrapper for Nextworks blocks.
 *
 * This file intentionally contains no next/* imports.
 */
function BlocksAppProviders({ children, defaultThemeVariant = "monochrome", }) {
    return ((0, jsx_runtime_1.jsx)(enhanced_theme_provider_1.EnhancedThemeProvider, { defaultThemeVariant: defaultThemeVariant, children: children }));
}

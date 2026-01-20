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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeVariant = useThemeVariant;
exports.EnhancedThemeProvider = EnhancedThemeProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const next_themes_1 = require("next-themes");
const themes_1 = require("../lib/themes");
const CUSTOM_STORAGE_KEY = "nxw-theme-custom";
const ThemeContext = React.createContext(undefined);
function useThemeVariant() {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useThemeVariant must be used within an EnhancedThemeProvider");
    }
    return context;
}
function EnhancedThemeProvider({ children, attribute = "class", defaultTheme = "system", enableSystem = true, disableTransitionOnChange = false, defaultThemeVariant = "monochrome", defaultCustomTokens = null, }) {
    const [themeVariant, setThemeVariant] = React.useState(defaultThemeVariant);
    const [customTheme, setCustomThemeState] = React.useState(defaultCustomTokens);
    const writeCustomCookies = React.useCallback((tokens) => {
        if (tokens) {
            document.cookie = `theme-variant=custom; Path=/; Max-Age=31536000; SameSite=Lax`;
            document.cookie = `theme-custom=${encodeURIComponent(JSON.stringify(tokens))}; Path=/; Max-Age=31536000; SameSite=Lax`;
        }
        else {
            document.cookie = `theme-custom=; Path=/; Max-Age=0; SameSite=Lax`;
        }
    }, []);
    const setCustomTheme = React.useCallback((tokens) => {
        setCustomThemeState(tokens);
        try {
            if (tokens) {
                localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(tokens));
            }
            else {
                localStorage.removeItem(CUSTOM_STORAGE_KEY);
            }
        }
        catch (_a) { }
        writeCustomCookies(tokens !== null && tokens !== void 0 ? tokens : null);
    }, [writeCustomCookies]);
    const setCustomBrandColors = React.useCallback((tokens) => {
        setThemeVariant("custom");
        setCustomTheme(tokens);
    }, [setCustomTheme]);
    const applyTheme = React.useCallback((variant, isDark = false) => {
        const base = isDark ? themes_1.darkThemes[variant].colors : themes_1.themes[variant].colors;
        const merged = variant === "custom" && customTheme
            ? Object.assign(Object.assign({}, base), customTheme) : base;
        // Apply CSS custom properties to the document root
        const root = document.documentElement;
        // Reflect the current variant for CSS selectors
        root.setAttribute("data-theme-variant", variant);
        Object.entries(merged).forEach(([key, value]) => {
            const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
            root.style.setProperty(cssVar, value);
        });
    }, [customTheme]);
    // Apply theme when variant or custom tokens change
    React.useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        applyTheme(themeVariant, isDark);
    }, [themeVariant, customTheme, applyTheme]);
    // Load custom tokens from localStorage on mount (overrides defaultCustomTokens if present)
    React.useEffect(() => {
        try {
            const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                setCustomThemeState(parsed);
            }
        }
        catch (_a) { }
    }, []);
    // Listen for theme changes from next-themes
    React.useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes" &&
                    mutation.attributeName === "class") {
                    const isDark = document.documentElement.classList.contains("dark");
                    applyTheme(themeVariant, isDark);
                }
            });
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, [themeVariant, applyTheme]);
    const contextValue = React.useMemo(() => ({
        themeVariant,
        setThemeVariant,
        customTheme,
        setCustomTheme,
        setCustomBrandColors,
        applyTheme,
    }), [
        themeVariant,
        customTheme,
        setCustomTheme,
        setCustomBrandColors,
        applyTheme,
    ]);
    return ((0, jsx_runtime_1.jsx)(next_themes_1.ThemeProvider, { attribute: attribute, defaultTheme: defaultTheme, enableSystem: enableSystem, disableTransitionOnChange: disableTransitionOnChange, children: (0, jsx_runtime_1.jsx)(ThemeContext.Provider, { value: contextValue, children: children }) }));
}

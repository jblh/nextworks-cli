"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeToggle = ThemeToggle;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const next_themes_1 = require("next-themes");
const utils_1 = require("../lib/utils");
const button_1 = require("../ui/button");
function ThemeToggle({ buttonProps, ariaLabel = "Toggle theme", moonClassName, sunClassName, }) {
    const { theme, setTheme } = (0, next_themes_1.useTheme)();
    const mergedButtonProps = Object.assign(Object.assign({ variant: "outline", size: "icon" }, buttonProps), { className: (0, utils_1.cn)("relative", 
        // Prefer preset variables if provided on Navbar
        "bg-[var(--navbar-toggle-bg)] text-[var(--navbar-accent)] hover:bg-[var(--navbar-hover-bg)] focus-visible:ring-[var(--navbar-ring)]", 
        // Ensure border uses preset variable; provide width for unstyled cases
        "border border-[var(--navbar-border)]", buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.className), 
        // Inline style ensures our accent wins over token classes even under dark: variants
        style: Object.assign(Object.assign({}, buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.style), { color: "var(--navbar-accent)", backgroundColor: "var(--navbar-toggle-bg)", borderColor: "var(--navbar-border)", 
            // Tell Tailwind ring utilities which ring color to use
            "--tw-ring-color": "var(--navbar-ring)" }) });
    return ((0, jsx_runtime_1.jsxs)(button_1.Button, Object.assign({}, mergedButtonProps, { onClick: () => setTheme(theme === "light" ? "dark" : "light"), "aria-label": ariaLabel, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Moon, { className: (0, utils_1.cn)("h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90", moonClassName) }), (0, jsx_runtime_1.jsx)(lucide_react_1.Sun, { className: (0, utils_1.cn)("absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0", sunClassName) }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: ariaLabel })] })));
}

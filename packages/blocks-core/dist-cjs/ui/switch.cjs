"use strict";
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
exports.Switch = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const utils_1 = require("../lib/utils");
const Switch = React.forwardRef((_a, ref) => {
    var { className, isLoading, disabled } = _a, props = __rest(_a, ["className", "isLoading", "disabled"]);
    const checked = !!props.checked;
    const isDisabled = !!disabled || !!isLoading;
    return ((0, jsx_runtime_1.jsxs)("label", { className: (0, utils_1.cn)("focus-within:ring-offset-background inline-flex items-center rounded-full focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-2", isDisabled ? "cursor-not-allowed opacity-80" : "cursor-pointer", className), children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ type: "checkbox", role: "switch", ref: ref, className: "sr-only", disabled: isDisabled, "aria-busy": isLoading ? "true" : undefined }, props)), (0, jsx_runtime_1.jsxs)("span", { "aria-hidden": true, className: (0, utils_1.cn)("relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200", checked ? "bg-[var(--primary)]" : "bg-[var(--primary)]/80"), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)(
                        // Thumb should adjust for theme to guarantee contrast
                        "absolute top-0.5 left-0.5 h-5 w-5 transform rounded-full bg-[var(--switch-thumb)] shadow-md transition-transform duration-200 ease-in-out", checked ? "translate-x-5" : "translate-x-0") }), isLoading && ((0, jsx_runtime_1.jsx)("span", { className: "absolute inset-0 flex items-center justify-center", children: (0, jsx_runtime_1.jsxs)("svg", { className: "h-4 w-4 animate-spin text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": true, children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" })] }) }))] })] }));
});
exports.Switch = Switch;
Switch.displayName = "Switch";

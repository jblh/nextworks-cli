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
exports.buttonVariants = exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_slot_1 = require("@radix-ui/react-slot");
const class_variance_authority_1 = require("class-variance-authority");
const utils_1 = require("../lib/utils");
const buttonVariants = (0, class_variance_authority_1.cva)("focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-xs",
            outline: "bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
exports.buttonVariants = buttonVariants;
const Button = React.forwardRef((_a, ref) => {
    var _b;
    var { className, variant, size, asChild = false, unstyled = false, forceInlineVars = false } = _a, props = __rest(_a, ["className", "variant", "size", "asChild", "unstyled", "forceInlineVars"]);
    const Comp = asChild ? react_slot_1.Slot : "button";
    // Use caller-provided style; only inject inline var-driven colors when explicitly requested
    const incomingStyle = (_b = props.style) !== null && _b !== void 0 ? _b : undefined;
    const finalStyle = forceInlineVars && !unstyled
        ? Object.assign(Object.assign({}, incomingStyle), { color: "var(--btn-fg)", backgroundColor: "var(--btn-bg)", borderColor: "var(--btn-border)", "--tw-ring-color": "var(--btn-ring)" }) : incomingStyle;
    // Only enable CSS variable hooks when explicitly requested via inline vars
    // or when the caller sets any [--btn-*] classes in className.
    const wantsVarHooks = !unstyled &&
        (forceInlineVars ||
            (typeof className === "string" && className.includes("[--btn-")));
    return ((0, jsx_runtime_1.jsx)(Comp, Object.assign({ ref: ref, "data-slot": "button", className: unstyled
            ? (0, utils_1.cn)("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50", className)
            : (0, utils_1.cn)(buttonVariants({ variant, size }), wantsVarHooks && [
                // Color var hooks (apply only when CSS vars are provided)
                "text-[var(--btn-fg)]",
                "bg-[var(--btn-bg)]",
                "hover:bg-[var(--btn-hover-bg)]",
                "hover:text-[var(--btn-hover-fg)]",
                // explicit dark variants to compete with dark: utilities from variants like outline
                "dark:bg-[var(--btn-bg)]",
                "dark:hover:bg-[var(--btn-hover-bg)]",
                "dark:hover:text-[var(--btn-hover-fg)]",
                // Focus ring and border hooks
                "focus-visible:ring-[var(--btn-ring)]",
                "border-[var(--btn-border)]",
                "dark:border-[var(--btn-border)]",
            ], className), style: finalStyle }, props)));
});
exports.Button = Button;
Button.displayName = "Button";

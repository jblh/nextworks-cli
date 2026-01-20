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
exports.AlertDialogTrigger = exports.AlertDialogTitle = exports.AlertDialogPortal = exports.AlertDialogOverlay = exports.AlertDialogDescription = exports.AlertDialogContent = exports.AlertDialogCancel = exports.AlertDialogAction = exports.AlertDialog = void 0;
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogHeader = AlertDialogHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const AlertDialogPrimitive = __importStar(require("@radix-ui/react-alert-dialog"));
const utils_1 = require("../lib/utils");
const AlertDialog = AlertDialogPrimitive.Root;
exports.AlertDialog = AlertDialog;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
exports.AlertDialogTrigger = AlertDialogTrigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
exports.AlertDialogPortal = AlertDialogPortal;
const AlertDialogOverlay = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Overlay, Object.assign({ ref: ref, className: (0, utils_1.cn)("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm", className) }, props)));
});
exports.AlertDialogOverlay = AlertDialogOverlay;
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsxs)(AlertDialogPortal, { children: [(0, jsx_runtime_1.jsx)(AlertDialogOverlay, {}), (0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Content, Object.assign({ ref: ref, className: (0, utils_1.cn)("bg-background fixed top-1/2 left-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg", className) }, props))] }));
});
exports.AlertDialogContent = AlertDialogContent;
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
function AlertDialogHeader(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, utils_1.cn)("flex flex-col space-y-1 text-center", className) }, props)));
}
function AlertDialogFooter(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, utils_1.cn)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className) }, props)));
}
const AlertDialogTitle = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Title, Object.assign({ ref: ref, className: (0, utils_1.cn)("text-lg font-semibold", className) }, props)));
});
exports.AlertDialogTitle = AlertDialogTitle;
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Description, Object.assign({ ref: ref, className: (0, utils_1.cn)("text-muted-foreground text-sm", className) }, props)));
});
exports.AlertDialogDescription = AlertDialogDescription;
AlertDialogDescription.displayName =
    AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Action, Object.assign({ ref: ref, className: (0, utils_1.cn)("bg-destructive text-destructive-foreground inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium shadow transition-colors hover:opacity-90 focus:outline-none", className) }, props)));
});
exports.AlertDialogAction = AlertDialogAction;
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Cancel, Object.assign({ ref: ref, className: (0, utils_1.cn)("bg-background hover:bg-muted inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium shadow focus:outline-none", className) }, props)));
});
exports.AlertDialogCancel = AlertDialogCancel;
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

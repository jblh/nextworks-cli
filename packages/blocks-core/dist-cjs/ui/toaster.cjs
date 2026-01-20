"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppToaster;
const jsx_runtime_1 = require("react/jsx-runtime");
const sonner_1 = require("sonner");
function AppToaster() {
    return (0, jsx_runtime_1.jsx)(sonner_1.Toaster, { position: "top-center", richColors: true, closeButton: true });
}

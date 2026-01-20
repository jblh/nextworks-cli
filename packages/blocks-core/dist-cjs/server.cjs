"use strict";
// Server-only exports for @nextworks/blocks-core
// Use this entry for components that must only run on the server.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppProviders = void 0;
var AppProviders_server_1 = require("./components/AppProviders.server.cjs");
Object.defineProperty(exports, "AppProviders", { enumerable: true, get: function () { return __importDefault(AppProviders_server_1).default; } });

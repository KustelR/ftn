"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
var path = require("path");
var fs = require("fs/promises");
function build() {
    return __awaiter(this, void 0, void 0, function () {
        var uiDir, style, _a, script, _b, html, err_1, err_2, targetPath;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    uiDir = path.resolve(__dirname, "./ui");
                    _a = "<style>\n".concat;
                    return [4 /*yield*/, fs.readFile(path.join(uiDir, "output.css"))];
                case 1:
                    style = _a.apply("<style>\n", [_c.sent(), "\n</style>"]);
                    _b = "<script>".concat;
                    return [4 /*yield*/, fs.readFile(path.join(uiDir, "script.js"))];
                case 2:
                    script = _b.apply("<script>", [_c.sent(), "</script>"]);
                    return [4 /*yield*/, fs.readFile(path.join(uiDir, "ui.html"))];
                case 3:
                    html = (_c.sent())
                        .toString()
                        .split("\n");
                    html.splice(1, 0, style.toString());
                    html.push(script.toString());
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, fs.mkdir(path.join(__dirname, "dist"), { recursive: false })];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _c.sent();
                    if (err_1.code !== "EEXIST")
                        throw err_1;
                    return [3 /*break*/, 7];
                case 7:
                    _c.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, fs.mkdir(path.join(__dirname, "dist", "ui"), { recursive: false })];
                case 8:
                    _c.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_2 = _c.sent();
                    if (err_2.code !== "EEXIST")
                        throw err_2;
                    return [3 /*break*/, 10];
                case 10:
                    targetPath = path.join(__dirname, "/dist", "/ui", "index.html");
                    fs.writeFile(targetPath, html.join("\n"), { flag: "w+" });
                    console.log("Ui created at ".concat(targetPath));
                    return [2 /*return*/];
            }
        });
    });
}
exports.build = build;
build();

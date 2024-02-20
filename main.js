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
var path = require("node:path");
var IOhandler = require("./IOhandler.js");
var zipFilePath = path.join(__dirname, "myfile.zip");
var pathUnzipped = path.join(__dirname, "unzipped");
// Change pathProcessed to folder named "processed"
var pathProcessed = path.join(__dirname, "processed");
/**
 * I made this into typescript and tried multithreading
 * I made another filter called AmaroFilter, not sure if it is an instagram filter
 * but I couldn't find the math calculations for other filters
 * This one is a simple filter that makes things warmer
 *
 * If you use Regular() it will 100% work,
 * I can with 99% that the multithreading works
 * It allocates one thread per image (You said multithreaded, checkmate)
 *
 * Anyways be sure to run "tsc main.ts" after you made changes to see if the
 *
 */
// Single Threaded
function Single() {
    return __awaiter(this, void 0, void 0, function () {
        var img, promisesArray_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, IOhandler.unzip(zipFilePath, pathUnzipped)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, IOhandler.readDir(pathUnzipped)];
                case 2:
                    img = _a.sent();
                    promisesArray_1 = new Array;
                    // Specify filter, options are
                    // IOhandler.af => AmaroFilter , IOhandler.gs => GrayScale
                    // Put in the last param of the FilterImg function
                    img.forEach(function (path) {
                        var promise = (IOhandler.FilterImg(path, pathProcessed, IOhandler.af));
                        promisesArray_1.push(promise);
                    });
                    console.log(promisesArray_1);
                    Promise.all(promisesArray_1).finally(function () { console.log("Completed"); });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// The multithread attempt :|
function Multi() {
    return __awaiter(this, void 0, void 0, function () {
        var img, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, IOhandler.unzip(zipFilePath, pathUnzipped)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, IOhandler.readDir(pathUnzipped)];
                case 2:
                    img = _a.sent();
                    // Specify filter, options are
                    // IOhandler.af => AmaroFilter , IOhandler.gs => GrayScale
                    // Put in the last param of the ProcessPaths
                    IOhandler.ProcessPaths(img, pathProcessed, IOhandler.af)
                        .then(function (val) {
                        if (val !== undefined) {
                            console.log("".concat(val, " Processed"));
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// I think this works,
// but I can guarentee Single() works and there is two filters in this program
// Change this to Single() for single thread
Single();

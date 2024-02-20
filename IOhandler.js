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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.af = exports.gs = exports.ProcessPaths = exports.FilterImg = exports.readDir = exports.unzip = void 0;
var fs = require("fs");
var path = require("path");
var pngjs_1 = require("pngjs");
var yauzl = require("yauzl-promise");
var promises_1 = require("stream/promises");
var worker_threads_1 = require("worker_threads");
/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
function unzip(pathIn, pathOut) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var zip, _d, zip_1, zip_1_1, entry, readStream, writeStream, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, yauzl.open(pathIn)];
                case 1:
                    zip = _e.sent();
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, , 19, 21]);
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 12, 13, 18]);
                    _d = true, zip_1 = __asyncValues(zip);
                    _e.label = 4;
                case 4: return [4 /*yield*/, zip_1.next()];
                case 5:
                    if (!(zip_1_1 = _e.sent(), _a = zip_1_1.done, !_a)) return [3 /*break*/, 11];
                    _c = zip_1_1.value;
                    _d = false;
                    entry = _c;
                    if (!entry.filename.endsWith('/')) return [3 /*break*/, 7];
                    return [4 /*yield*/, fs.promises.mkdir("".concat(path.join(pathOut, entry.filename)), { recursive: true })];
                case 6:
                    _e.sent();
                    return [3 /*break*/, 10];
                case 7: return [4 /*yield*/, entry.openReadStream()];
                case 8:
                    readStream = _e.sent();
                    writeStream = fs.createWriteStream("".concat(path.join(pathOut, entry.filename)));
                    return [4 /*yield*/, (0, promises_1.pipeline)(readStream, writeStream)];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10:
                    _d = true;
                    return [3 /*break*/, 4];
                case 11: return [3 /*break*/, 18];
                case 12:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 18];
                case 13:
                    _e.trys.push([13, , 16, 17]);
                    if (!(!_d && !_a && (_b = zip_1.return))) return [3 /*break*/, 15];
                    return [4 /*yield*/, _b.call(zip_1)];
                case 14:
                    _e.sent();
                    _e.label = 15;
                case 15: return [3 /*break*/, 17];
                case 16:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 17: return [7 /*endfinally*/];
                case 18: return [3 /*break*/, 21];
                case 19: return [4 /*yield*/, zip.close()];
                case 20:
                    _e.sent();
                    return [7 /*endfinally*/];
                case 21: return [2 /*return*/];
            }
        });
    });
}
exports.unzip = unzip;
;
/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
function readDir(dir) {
    return __awaiter(this, void 0, void 0, function () {
        var files, images, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.promises.readdir(dir)];
                case 1:
                    files = _a.sent();
                    images = new Array;
                    for (i = 0; files.length > i; ++i) {
                        if ((path.extname(files[i])) === '.png') {
                            images.push(path.join(dir, files[i]));
                        }
                    }
                    return [2 /*return*/, images];
            }
        });
    });
}
exports.readDir = readDir;
;
// FilterImg Function
function FilterImg(pathIn, pathOut, filter) {
    return __awaiter(this, void 0, void 0, function () {
        var readableStream, writeableStream, streamPNG;
        return __generator(this, function (_a) {
            readableStream = fs.createReadStream(pathIn);
            writeableStream = fs.createWriteStream("".concat(path.join(pathOut, path.basename(pathIn))));
            streamPNG = new pngjs_1.PNG({
                filterType: 4,
            });
            try {
                (0, promises_1.pipeline)(readableStream, streamPNG.on("parsed", filter), writeableStream);
            }
            catch (err) {
                console.log("Error ".concat(err));
                process.exit(1);
            }
            return [2 /*return*/];
        });
    });
}
exports.FilterImg = FilterImg;
;
// MultiThreading I think
// I'm not really sure actually, but I take doing this in typescript as a win
function ProcessPaths(array, pathOut, filter) {
    return __awaiter(this, void 0, void 0, function () {
        var Threads, workers, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Threads = array.length;
                    workers = new Array;
                    if (!worker_threads_1.isMainThread) return [3 /*break*/, 1];
                    _loop_1 = function (i) {
                        var worker = new worker_threads_1.Worker("./main.js", {
                            workerData: { threadId: i, chunk: array[i], output: pathOut }
                        });
                        workers.push(worker);
                        worker.on('online', function () {
                            console.log("Thread ".concat(i, " Online"));
                        });
                        worker.on('exit', function () {
                            console.log("Thread ".concat(i, " Done "));
                        });
                    };
                    for (i = 0; i < Threads; ++i) {
                        _loop_1(i);
                    }
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, FilterImg(worker_threads_1.workerData.chunk, worker_threads_1.workerData.output, filter)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, (path.basename(worker_threads_1.workerData.chunk))];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.ProcessPaths = ProcessPaths;
/**
 * Gray Scale
 *
 * @param {PNG} this
 * @param {Buffer} data
 * @return {void}
 */
function gs(data) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            var avg = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
            this.data[idx] = avg;
            this.data[idx + 1] = avg;
            this.data[idx + 2] = avg;
        }
    }
    this.pack();
}
exports.gs = gs;
;
/**
 * AmaroFilter
 *
 * @param {PNG} this
 * @param {Buffer} data
 * @return {void}
 */
function af(data) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            this.data[idx] = (Math.min(255, Math.floor(this.data[idx] * 1.2)));
            this.data[idx + 1] = (Math.min(255, Math.floor(this.data[idx + 1] * 1.1)));
            this.data[idx + 2] = (Math.min(255, Math.floor(this.data[idx + 2] * 0.9)));
        }
    }
    this.pack();
}
exports.af = af;
;

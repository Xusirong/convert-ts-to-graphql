"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const convert_1 = __importDefault(require("./convert"));
const defaultOptions = {
    baseUrl: __dirname,
    anyType: "Any"
};
/**
 *
 * @param filePath .d.ts文件所在位置
 * @param options 配置transfer的行为
 */
function default_1(options) {
    if (!options.inputFile) {
        console.error('参数必须传入inputFile');
        return false;
    }
    if (!options.outFile) {
        console.error('参数必须传入outFile');
        return false;
    }
    let inputFile = normPath(options.inputFile);
    let outFile = normPath(options.outFile);
    let baseUrl = options.baseUrl || defaultOptions.baseUrl;
    let anyType = options.anyType || defaultOptions.anyType;
    let outDir = '';
    if (options.outDir) {
        outDir = normPath(options.outDir);
        createDir(baseUrl + outDir);
    }
    let inputPath = baseUrl + inputFile;
    let outputPath = baseUrl + outDir + outFile;
    writeFile(outputPath, convert_1.default(inputPath, anyType));
}
exports.default = default_1;
function normPath(path) {
    let result = path.split('/').filter(value => {
        return value !== "";
    }).join('/');
    if (result.length > 0) {
        return '/' + result;
    }
    else {
        return '';
    }
}
function writeFile(outputPath, data) {
    fs_1.default.writeFile(outputPath, data, function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('转化成功');
    });
}
function createDir(outDir) {
    if (!fs_1.default.existsSync(outDir)) {
        fs_1.default.mkdirSync(outDir);
    }
}
//# sourceMappingURL=index.js.map
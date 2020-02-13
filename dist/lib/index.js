"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const convert_1 = __importDefault(require("./convert"));
const defaultOptions = {
    baseUrl: __dirname,
    anyType: "Any"
};
function convertFile(options) {
    if (!options.inputFile) {
        console.error('参数必须传入inputFile');
        return false;
    }
    let baseUrl = options.baseUrl || defaultOptions.baseUrl;
    let anyType = options.anyType || defaultOptions.anyType;
    let filePath = path_1.default.join(baseUrl, options.inputFile);
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error(`${filePath}文件不存在`);
    }
    return convert_1.default(filePath, anyType);
}
exports.convertFile = convertFile;
/**
 * @param filePath .d.ts文件所在位置
 * @param options 配置transfer的行为
 */
function convertDir(options) {
    if (!options.inputDir) {
        console.error('参数必须传入inputDir');
        return false;
    }
    if (!options.outDir) {
        console.error('参数必须传入outDir');
        return false;
    }
    let baseUrl = options.baseUrl || defaultOptions.baseUrl;
    let anyType = options.anyType || defaultOptions.anyType;
    let inputPath = path_1.default.join(baseUrl, options.inputDir);
    let outputPath = path_1.default.join(baseUrl, options.outDir);
    // 创建输出的文件夹
    createDir(outputPath);
    transferFiles(inputPath, outputPath, anyType);
}
exports.convertDir = convertDir;
function createDir(outDir) {
    if (!fs_1.default.existsSync(outDir)) {
        fs_1.default.mkdirSync(outDir);
    }
}
function transferFiles(inputPath, outputPath, anyType) {
    fs_1.default.readdir(inputPath, function (error, files) {
        if (error) {
            console.error(error);
        }
        else {
            files.forEach((filename) => {
                let input = path_1.default.join(inputPath, filename);
                let output = path_1.default.join(outputPath, filename);
                fs_1.default.stat(input, function (err, stats) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        let isFile = stats.isFile(); //是文件
                        if (isFile) {
                            writeFile(output, convert_1.default(input, anyType));
                        }
                        let isDir = stats.isDirectory(); //是文件夹
                        if (isDir) {
                            createDir(output);
                            transferFiles(input, output, anyType); //递归
                        }
                    }
                });
            });
        }
    });
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
//# sourceMappingURL=index.js.map
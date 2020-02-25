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
    if (!options.outputDir) {
        console.error('参数必须传入outputDir');
        return false;
    }
    let baseUrl = options.baseUrl || defaultOptions.baseUrl;
    let anyType = options.anyType || defaultOptions.anyType;
    let inputPath = path_1.default.join(baseUrl, options.inputDir);
    let outputPath = path_1.default.join(baseUrl, options.outputDir);
    // 创建输出的文件夹
    createDir(outputPath);
    transferFiles(inputPath, outputPath, anyType);
}
exports.convertDir = convertDir;
function createDir(outputDir) {
    if (!fs_1.default.existsSync(outputDir)) {
        fs_1.default.mkdirSync(outputDir);
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
                fs_1.default.stat(input, function (err, stats) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        //是文件
                        let isFile = stats.isFile();
                        let isTypeFile = filename.includes('.d.ts');
                        if (isFile && isTypeFile) {
                            // 后缀处理
                            let outputFile = filename.split('.d.ts')[0] + '.graphql';
                            let output = path_1.default.join(outputPath, outputFile);
                            writeFile(output, convert_1.default(input, anyType));
                        }
                        //是文件夹
                        let isDir = stats.isDirectory();
                        if (isDir) {
                            let output = path_1.default.join(outputPath, filename);
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
    });
}
//# sourceMappingURL=index.js.map
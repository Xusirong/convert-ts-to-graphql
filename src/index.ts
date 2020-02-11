import fs from 'fs'
import path from 'path'
import convert from './convert'

const defaultOptions = {
    baseUrl: __dirname,
    anyType: "Any"
}

interface ConvertFileOptions {
    // 基础路径
    baseUrl?: string
    // 输入的文件路径
    inputFile: string
    // any类型处理
    anyType?: string
}

function convertFile(options: ConvertFileOptions) {
    if (!options.inputFile) {
        console.error('参数必须传入inputFile')
        return false
    }

    let baseUrl = options.baseUrl || defaultOptions.baseUrl

    let anyType = options.anyType || defaultOptions.anyType

    let filePath = path.join(baseUrl, options.inputFile)

    if(!fs.existsSync(filePath)) {
        throw new Error(`${filePath}文件不存在`)
    }

    return convert(filePath, anyType)
}

interface ConvertDirOptions {
    // 基础路径
    baseUrl?: string
    // 输入的文件路径
    inputDir: string
    // 输出的文件目录
    outDir: string
    // any类型处理
    anyType?: string
}

/**
 * @param filePath .d.ts文件所在位置
 * @param options 配置transfer的行为
 */
function convertDir(options: ConvertDirOptions) {
    if (!options.inputDir) {
        console.error('参数必须传入inputDir')
        return false
    }
    if (!options.outDir) {
        console.error('参数必须传入outDir')
        return false
    }

    let baseUrl = options.baseUrl || defaultOptions.baseUrl

    let anyType = options.anyType || defaultOptions.anyType

    let inputPath = path.join(baseUrl, options.inputDir)

    let outputPath = path.join(baseUrl, options.outDir)

    // 创建输出的文件夹
    createDir(outputPath)

    writeFile(outputPath, convert(inputPath, anyType))
}

function writeFile(outputPath: string, data: string) {
    fs.writeFile(outputPath, data, function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('转化成功');
    })
}

function createDir(outDir: string) {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }
}

export {
    convertFile,
    convertDir
}

export default convertFile;
import fs from 'fs'
import convert from './convert'

interface TransferOptions {
    // 基础路径
    baseUrl?: string
    // 输入的文件路径
    inputFile: string
    // 输出的文件目录
    outDir?: string
    // 输出的文件名
    outFile: string
    // any类型处理
    anyType?: string
}

const defaultOptions = {
    baseUrl: __dirname,
    anyType: "Any"
}

/**
 * 
 * @param filePath .d.ts文件所在位置
 * @param options 配置transfer的行为
 */
export default function (options: TransferOptions) {
    if (!options.inputFile) {
        console.error('参数必须传入inputFile')
        return false
    }
    if (!options.outFile) {
        console.error('参数必须传入outFile')
        return false
    }

    let inputFile = normPath(options.inputFile)

    let outFile = normPath(options.outFile)

    let baseUrl = options.baseUrl || defaultOptions.baseUrl

    let anyType = options.anyType || defaultOptions.anyType

    let outDir = ''

    if (options.outDir) {
        outDir = normPath(options.outDir)
        createDir(baseUrl + outDir)
    }

    let inputPath = baseUrl + inputFile

    let outputPath = baseUrl + outDir + outFile

    writeFile(outputPath, convert(inputPath, anyType))
}

function normPath(path: string): string {
    let result = path.split('/').filter(value => {
        return value !== ""
    }).join('/')
    if(result.length > 0) {
        return '/' + result
    } else {
        return ''
    }
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
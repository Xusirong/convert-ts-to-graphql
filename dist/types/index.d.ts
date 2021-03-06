declare function convertCode(code: string, anyType?: string): string | false;
interface ConvertFileOptions {
    baseUrl?: string;
    inputFile: string;
    anyType?: string;
}
declare function convertFile(options: ConvertFileOptions): string | false;
interface ConvertDirOptions {
    baseUrl?: string;
    inputDir: string;
    outputDir: string;
    anyType?: string;
}
/**
 * @param filePath .d.ts文件所在位置
 * @param options 配置transfer的行为
 */
declare function convertDir(options: ConvertDirOptions): false | undefined;
export { convertCode, convertFile, convertDir };

interface TransferOptions {
    baseUrl?: string;
    inputFile: string;
    outDir?: string;
    outFile: string;
    anyType?: string;
}
/**
 *
 * @param filePath .d.ts文件所在位置
 * @param options 配置transfer的行为
 */
export default function (options: TransferOptions): false | undefined;
export {};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const handleTypeReference_1 = __importDefault(require("./handleTypeReference"));
const util_1 = require("util");
function getKeyworkType(keywordType, justString) {
    switch (keywordType.kind) {
        case typescript_1.default.SyntaxKind.AnyKeyword:
            return "any";
        case typescript_1.default.SyntaxKind.UnknownKeyword:
            return "unknown";
        case typescript_1.default.SyntaxKind.NumberKeyword:
            return "number";
        case typescript_1.default.SyntaxKind.BigIntKeyword:
            return "bigint";
        case typescript_1.default.SyntaxKind.ObjectKeyword:
            return "object";
        case typescript_1.default.SyntaxKind.BooleanKeyword:
            return "boolean";
        case typescript_1.default.SyntaxKind.StringKeyword:
            return "string";
        case typescript_1.default.SyntaxKind.SymbolKeyword:
            return "symbol";
        case typescript_1.default.SyntaxKind.VoidKeyword:
            return "void";
        case typescript_1.default.SyntaxKind.UndefinedKeyword:
            return "undefine";
        case typescript_1.default.SyntaxKind.NullKeyword:
            return "null";
        case typescript_1.default.SyntaxKind.NeverKeyword:
            return "never";
        case typescript_1.default.SyntaxKind.TypeReference:
            let typeReference = handleTypeReference_1.default(keywordType);
            if (util_1.isString(typeReference)) {
                return typeReference;
            }
            else {
                return typeReference[0];
            }
        // 暂时只做typeName处理，不处理参数
        // return typeReference
        default:
            return "any";
    }
}
exports.default = getKeyworkType;
//# sourceMappingURL=getKeyworkType.js.map
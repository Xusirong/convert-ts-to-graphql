"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const getName_1 = require("./getName");
function default_1(keywordType) {
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
            return handleTypeReference(keywordType);
        default:
            return "any";
    }
}
exports.default = default_1;
function handleTypeReference(keywordType) {
    if (typescript_1.default.isIdentifier(keywordType.typeName)) {
        return getName_1.handleIdentifier(keywordType.typeName);
    }
    if (typescript_1.default.isQualifiedName(keywordType.typeName)) {
        return getName_1.handleIdentifier(keywordType.typeName.right);
    }
    return "any";
}
//# sourceMappingURL=getKeyworkType.js.map
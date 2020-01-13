import ts from 'typescript'
import { handleIdentifier } from './getName'

export default function(keywordType: ts.TypeNode): string {
    switch(keywordType.kind) {
        case ts.SyntaxKind.AnyKeyword:
            return "any"
        case ts.SyntaxKind.UnknownKeyword:
            return "unknown"
        case ts.SyntaxKind.NumberKeyword:
            return "number"
        case ts.SyntaxKind.BigIntKeyword:
            return "bigint"
        case ts.SyntaxKind.ObjectKeyword:
            return "object"
        case ts.SyntaxKind.BooleanKeyword:
            return "boolean"
        case ts.SyntaxKind.StringKeyword:
            return "string"
        case ts.SyntaxKind.SymbolKeyword:
            return "symbol"
        case ts.SyntaxKind.VoidKeyword:
            return "void"
        case ts.SyntaxKind.UndefinedKeyword:
            return "undefine"
        case ts.SyntaxKind.NullKeyword:
            return "null"
        case ts.SyntaxKind.NeverKeyword:
            return "never"
        case ts.SyntaxKind.TypeReference:
            return handleTypeReference(keywordType as ts.TypeReferenceNode)
        default:
            return "any"
    }
}

function handleTypeReference(keywordType: ts.TypeReferenceNode): string {
    if(ts.isIdentifier(keywordType.typeName)) {
        return handleIdentifier(keywordType.typeName)
    }
    if(ts.isQualifiedName(keywordType.typeName)) {
        return handleIdentifier(keywordType.typeName.right)
    }
    return "any"
}
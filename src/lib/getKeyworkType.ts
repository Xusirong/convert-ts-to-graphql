import ts from 'typescript'
import handleTypeReference from './handleTypeReference'
import { isString } from 'util'
import { TypeReferenceReturn } from './handleTypeReference'

function getKeyworkType(keywordType: ts.TypeNode): string

function getKeyworkType(keywordType: ts.TypeNode, justString: boolean): TypeReferenceReturn

function getKeyworkType(keywordType: ts.TypeNode, justString?: boolean) {
    switch (keywordType.kind) {
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
            let typeReference = handleTypeReference(keywordType as ts.TypeReferenceNode)
            if (isString(typeReference)) {
                return typeReference
            } else {
                return typeReference[0]
            }
        // 暂时只做typeName处理，不处理参数
        // return typeReference
        default:
            return "any"
    }
}

export default getKeyworkType;
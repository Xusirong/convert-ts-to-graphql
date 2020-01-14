import ts from 'typescript'
import { handleIdentifier } from './getName'
import getKeyworkType from './getKeyworkType'

export type TypeReferenceReturn = string | [string, TypeArguments]

export interface TypeArguments extends Array<string | TypeReferenceReturn> {}

export default function(type: ts.TypeReferenceNode): TypeReferenceReturn {
    let typeArguments: TypeArguments = []
    if(type.typeArguments) {
        type.typeArguments.forEach(item => {
            typeArguments.push(getKeyworkType(item))
        })
    }

    let typeName: string
    if(ts.isIdentifier(type.typeName)) {
        typeName = handleIdentifier(type.typeName)
    } else if(ts.isQualifiedName(type.typeName)) {
        typeName = handleIdentifier(type.typeName.right)
    } else {
        typeName = "any"
    }

    if(typeArguments.length > 0) {
        return [typeName, typeArguments]
    } else {
        return typeName
    }
}
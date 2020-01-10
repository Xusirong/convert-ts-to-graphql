import ts from "typescript"
import { handlePropertyName } from './getName'
import getKeywordType from './getKeyworkType'

export default function(propertySignature: ts.PropertySignature) {
    let name = handlePropertyName(propertySignature.name)

    let type: string = "any"
    if(propertySignature.type) {
        type = getKeywordType(propertySignature.type)
    }

    return [name, type]
}
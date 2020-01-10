import ts from 'typescript'

export function handlePropertyName(propertyName: ts.PropertyName): string {
    if (ts.isIdentifier(propertyName)) {
        return handleIdentifier(propertyName)
    }
    if(ts.isStringLiteral(propertyName)) {
        return handleStringLiteral(propertyName)
    }
    if(ts.isNumericLiteral(propertyName)) {
        return handleNumericLiteral(propertyName)
    }
    // if(ts.isComputedPropertyName(propertyName)) {
    //     return handleComputedPropertyName(propertyName)
    // }
    return "properyName"
}

export function handleIdentifier(identifier: ts.Identifier): string {
    return identifier.text
}

export function handleStringLiteral(stringLiteral: ts.StringLiteral): string {
    return stringLiteral.text
}

export function handleNumericLiteral(numericLiteral: ts.NumericLiteral): string {
    return numericLiteral.text
}

// export function handleComputedPropertyName(computedPropertyName: ts.ComputedPropertyName) {
//     return computedPropertyName.expression
// }
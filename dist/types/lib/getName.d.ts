import ts from 'typescript';
export declare function handlePropertyName(propertyName: ts.PropertyName): string;
export declare function handleIdentifier(identifier: ts.Identifier): string;
export declare function handleStringLiteral(stringLiteral: ts.StringLiteral): string;
export declare function handleNumericLiteral(numericLiteral: ts.NumericLiteral): string;

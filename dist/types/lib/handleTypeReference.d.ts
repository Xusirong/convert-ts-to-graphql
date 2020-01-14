import ts from 'typescript';
export declare type TypeReferenceReturn = string | [string, TypeArguments];
export interface TypeArguments extends Array<string | TypeReferenceReturn> {
}
export default function (type: ts.TypeReferenceNode): TypeReferenceReturn;

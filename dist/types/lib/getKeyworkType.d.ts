import ts from 'typescript';
import { TypeReferenceReturn } from './handleTypeReference';
declare function getKeyworkType(keywordType: ts.TypeNode): string;
declare function getKeyworkType(keywordType: ts.TypeNode, justString: boolean): TypeReferenceReturn;
export default getKeyworkType;

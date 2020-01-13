import ts from 'typescript'
import { FCItem } from '../index'

export default function(statement: ts.TypeAliasDeclaration): FCItem {
    return {
        name: "",
        function: () => {}
    }
}
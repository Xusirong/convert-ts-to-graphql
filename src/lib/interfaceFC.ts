import ts from 'typescript'
import { FCItem } from '../index'
import { handleIdentifier } from './getName'
import handlePropertySignature from './handlePropertySignature'

export default function(statement: ts.InterfaceDeclaration): FCItem {
    let name = handleIdentifier(statement.name)
    
    let typeParameters = statement.typeParameters
    let heritageClauses = statement.heritageClauses

    let members: Record<string, string> = {} 
    statement.members.forEach(member => {
        let [ memberName, memberType ] = handlePropertySignature(member as ts.PropertySignature)
        members[memberName] = memberType
    })

    return {
        name,
        members,
        function: function() {
            let result = members
            return result
        }
    }
}
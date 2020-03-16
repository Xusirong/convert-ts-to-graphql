import ts from 'typescript'
import { FCItem } from '../../convert'
import { handleIdentifier } from '../getName'

export default function(statement: ts.ImportDeclaration): FCItem[] {
    let exportDefaultType: string | undefined
    let exportType: string[] = []

    let importClause = statement.importClause
    if(!importClause) {
        return []
    }

    if(importClause.name) {
        exportDefaultType = handleIdentifier(importClause.name)
    }

    if(importClause.namedBindings) {
        if(ts.isNamedImports(importClause.namedBindings)) {
            importClause.namedBindings.elements.forEach(element => {
                exportType.push(handleIdentifier(element.name))
            })
        } else {
            throw Error('暂不支持导出spaceImport')
        }
    }

    let allType: string[] = exportType
    if(exportDefaultType) {
        allType.push(exportDefaultType)
    }

    return allType.map(item => {
        return {
            name: item,
            function: function() { return {} }
        }
    })
}
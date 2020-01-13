import ts from 'typescript'
import fs from 'fs'
import interfaceFC from './lib/interfaceFC'
import typeFC from './lib/typeFC'

export default function(filePath: string) {
    const codeBuffer = fs.readFileSync(filePath)
    const code = codeBuffer.toString()

    const sourceFile: ts.SourceFile = ts.createSourceFile("ts", code, ts.ScriptTarget.ES2015, true)
    const { statements } = sourceFile

    let FCList: Record<string, Function> = {}
    statements.forEach(statement => {
        const fcItem = createFCFromStatement(statement)
        if(fcItem) {
            FCList[fcItem.name] = fcItem.function.bind(FCList)
        }
    })

    let graphqlDSL: string = ""
    Object.keys(FCList).forEach(name => {
        const result = buildDSLFromTypeFC(name, FCList[name], FCList)
        if(result) { graphqlDSL += result }
    })

    return graphqlDSL
}

export type FCItem = {
    name: string
    function: Function
}
function createFCFromStatement(statement: ts.Statement): FCItem | undefined {
    if(ts.isInterfaceDeclaration(statement)) {
        return interfaceFC(statement)
    }
    if(ts.isTypeAliasDeclaration(statement)) {
        return typeFC(statement)
    }
    return undefined
}

function buildDSLFromTypeFC(name: string, fcItem: Function, fcList: Record<string, Function>): string {
    console.log(fcItem())
    return "is ok?"
}
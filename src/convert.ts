import ts from 'typescript'
import interfaceFC from './lib/interfaceFC'
import typeFC from './lib/typeFC'
import { isString } from 'util'

export default function (code: string, anyType: string) {
    const sourceFile: ts.SourceFile = ts.createSourceFile("ts", code, ts.ScriptTarget.ES2015, true)
    const { statements } = sourceFile

    let FCList: Record<string, Function> = {}
    statements.forEach(statement => {
        const fcItem = createFCFromStatement(statement)
        if (fcItem) {
            FCList[fcItem.name] = fcItem.function.bind(FCList)
        }
    })

    let FCNameList: string[] = Object.keys(FCList)
    let graphqlDSL: string = ""
    FCNameList.forEach(name => {
        const result = buildDSLFromTypeFC(name, FCList[name], FCNameList, anyType)
        if (result) { graphqlDSL += result }
    })

    return graphqlDSL
}

export type FCItem = {
    name: string
    function: Function
}
function createFCFromStatement(statement: ts.Statement): FCItem | undefined {
    if (ts.isInterfaceDeclaration(statement)) {
        return interfaceFC(statement)
    }
    if (ts.isTypeAliasDeclaration(statement)) {
        return typeFC(statement)
    }
    return undefined
}

const typeMapping: Record<string, string> = {
    "string": "String",
    "number": "Float",
    "boolean": "Boolean",
    "bigint": "Int"
}

function replacer(value: string | object, FCNameList: string[], anyType: string) {
    if (isString(value)) {
        if (typeMapping[value]) {
            return typeMapping[value]
        } else if(FCNameList.includes(value)) {
            return value
        } else {
            return anyType
        }
    } else {
        return value
    }
}

function buildDSLFromTypeFC(
    name: string,
    fcItem: Function,
    FCNameList: string[],
    anyType: string
): string {
    let body = JSON.stringify(
        fcItem(),
        (key: string, value: string) => replacer(value, FCNameList, anyType),
        2).replace(/"/g, "")

    return `type ${name} ${body} \n\n`
}
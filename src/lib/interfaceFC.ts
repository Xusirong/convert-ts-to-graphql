import ts from 'typescript'
import { FCItem } from '../index'
import { handleIdentifier } from './getName'
import handlePropertySignature from './handlePropertySignature'
import getKeyworkType from './getKeyworkType'

export default function (statement: ts.InterfaceDeclaration): FCItem {
    let name = handleIdentifier(statement.name)

    let typeArgsName: string[] = []
    let typeArgsValue: string[] = []
    if (statement.typeParameters) {
        statement.typeParameters.forEach(item => {
            typeArgsName.push(handleIdentifier(item.name))
            if (item.default) {
                typeArgsValue.push(getKeyworkType(item.default))
            } else if (item.constraint) {
                typeArgsValue.push(getKeyworkType(item.constraint))
            } else {
                typeArgsValue.push("any")
            }
        })
    }

    let extendings: Array<{ name: string, args?: string[] }> = []
    if (statement.heritageClauses) {
        statement.heritageClauses.forEach(heritage => {
            heritage.types.forEach(item => {
                let extendingsName = handleIdentifier(item.expression as ts.Identifier)
                if (item.typeArguments) {
                    let agrs = item.typeArguments.map(i => {
                        return handleIdentifier((i as any).typeName)
                    })
                    extendings.push({ name: extendingsName, args: agrs })
                } else {
                    extendings.push({ name: extendingsName })
                }
            })
        })
    }

    let members: Record<string, string> = {}
    statement.members.forEach(member => {
        let [memberName, memberType] = handlePropertySignature(member as ts.PropertySignature)
        members[memberName] = memberType
    })

    return {
        name,
        function: function () {
            let result: Record<string, string> = {}

            // 参数处理
            let args: string[] = []
            for(let i = 0; i < typeArgsValue.length; i++) {
                args[i] = arguments[i] || typeArgsValue[i]
            }

            // 继承处理
            extendings.forEach(extend => {
                if(extend.args) {
                    for(let key in extend.args) {
                        if(typeArgsName.includes(extend.args[key])) {
                            let index = typeArgsName.indexOf(extend.args[key])
                            extend.args[key] = args[index]
                        }
                    }
                    Object.assign(result, (this as any)[extend.name](...extend.args))
                } else {
                    Object.assign(result, (this as any)[extend.name]())
                }
            })

            // members处理
            for(let key in members) {
                if(typeArgsName.includes(members[key])) {
                    let index = typeArgsName.indexOf(members[key])
                    result[key] = args[index]
                } else {
                    result[key] = members[key]
                }
            }

            return result
        }
    }
}
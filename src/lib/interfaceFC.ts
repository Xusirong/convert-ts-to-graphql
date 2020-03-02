import ts from 'typescript'
import { FCItem } from '../convert'
import { handleIdentifier } from './getName'
import handlePropertySignature from './handlePropertySignature'
import getKeyworkType from './getKeyworkType'

export default function (statement: ts.InterfaceDeclaration): FCItem {
    let name = handleIdentifier(statement.name)

    // 范型处理
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

    // extends 处理
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

    // 属性处理
    let members: Record<string, string> = {}
    let membersAgrs: Record<string, string[]> = {}
    statement.members.forEach(member => {
        if (ts.isPropertySignature(member)) {
            let [memberName, memberType] = handlePropertySignature(member)
            members[memberName] = memberType

            // 参数处理
            if (member.type && ts.isTypeReferenceNode(member.type)) {
                if (member.type.typeArguments) {
                    let agrs = member.type.typeArguments.map(i => {
                        if (ts.isTypeReferenceNode(i)) {
                            return "any"
                        } else {
                            return getKeyworkType(i)
                        }
                    })
                    membersAgrs[memberName] = agrs
                }
            }
        }
    })

    return {
        name,
        function: function () {
            let result: Record<string, string> = {}

            // 参数处理
            let args: string[] = []
            for (let i = 0; i < typeArgsValue.length; i++) {
                args[i] = arguments[i] || typeArgsValue[i]
            }

            // 继承处理
            extendings.forEach(extend => {
                if (extend.args) {
                    for (let key in extend.args) {
                        if (typeArgsName.includes(extend.args[key])) {
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
            for (let key in members) {
                if (typeArgsName.includes(members[key])) {
                    // 属性值为范型
                    let index = typeArgsName.indexOf(members[key])
                    result[key] = args[index]
                } else if ((this as any)[members[key]]) {
                    // 属性值为类型

                    // 将类型拓展开的实现方式
                    // if (membersAgrs[key]) {
                    //     result[key] = (this as any)[members[key]](...membersAgrs[key])
                    // } else {
                    //     result[key] = (this as any)[members[key]]()
                    // }

                    // 将类型直接输出
                    result[key] = members[key]
                } else {
                    result[key] = members[key]
                }
            }

            return result
        }
    }
}
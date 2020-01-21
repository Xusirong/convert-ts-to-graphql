import ts from 'typescript'
import { FCItem } from '../convert'
import { handleIdentifier } from './getName'
import handlePropertySignature from './handlePropertySignature'
import getKeyworkType from './getKeyworkType'

export default function (statement: ts.TypeAliasDeclaration): FCItem {
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

    // 属性处理
    let members: Record<string, string> = {}
    let membersAgrs: Record<string, string[]> = {}
    if (ts.isTypeLiteralNode(statement.type)) {
        statement.type.members.forEach(member => {
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
    } else {
        console.warn(`Type ${name} cannot be convert, just supports TypeLiteral type conversions.`)
    }

    return {
        name,
        function: function () {
            let result: Record<string, string> = {}

            // 参数处理
            let args: string[] = []
            for (let i = 0; i < typeArgsValue.length; i++) {
                args[i] = arguments[i] || typeArgsValue[i]
            }

            // members处理
            for (let key in members) {
                if (typeArgsName.includes(members[key])) {
                    // 属性值为范型
                    let index = typeArgsName.indexOf(members[key])
                    result[key] = args[index]
                } else if ((this as any)[members[key]]) {
                    // 属性值为类型
                    if (membersAgrs[key]) {
                        result[key] = (this as any)[members[key]](...membersAgrs[key])
                    } else {
                        result[key] = (this as any)[members[key]]()
                    }
                } else {
                    result[key] = members[key]
                }
            }

            return result
        }
    }
}
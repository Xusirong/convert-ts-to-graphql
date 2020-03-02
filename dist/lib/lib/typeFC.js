"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const getName_1 = require("./getName");
const handlePropertySignature_1 = __importDefault(require("./handlePropertySignature"));
const getKeyworkType_1 = __importDefault(require("./getKeyworkType"));
function default_1(statement) {
    let name = getName_1.handleIdentifier(statement.name);
    // 范型处理
    let typeArgsName = [];
    let typeArgsValue = [];
    if (statement.typeParameters) {
        statement.typeParameters.forEach(item => {
            typeArgsName.push(getName_1.handleIdentifier(item.name));
            if (item.default) {
                typeArgsValue.push(getKeyworkType_1.default(item.default));
            }
            else if (item.constraint) {
                typeArgsValue.push(getKeyworkType_1.default(item.constraint));
            }
            else {
                typeArgsValue.push("any");
            }
        });
    }
    // 属性处理
    let members = {};
    let membersAgrs = {};
    if (typescript_1.default.isTypeLiteralNode(statement.type)) {
        statement.type.members.forEach(member => {
            if (typescript_1.default.isPropertySignature(member)) {
                let [memberName, memberType] = handlePropertySignature_1.default(member);
                members[memberName] = memberType;
                // 参数处理
                if (member.type && typescript_1.default.isTypeReferenceNode(member.type)) {
                    if (member.type.typeArguments) {
                        let agrs = member.type.typeArguments.map(i => {
                            if (typescript_1.default.isTypeReferenceNode(i)) {
                                return "any";
                            }
                            else {
                                return getKeyworkType_1.default(i);
                            }
                        });
                        membersAgrs[memberName] = agrs;
                    }
                }
            }
        });
    }
    else {
        console.warn(`Type ${name} cannot be convert, just supports TypeLiteral type conversions.`);
    }
    return {
        name,
        function: function () {
            let result = {};
            // 参数处理
            let args = [];
            for (let i = 0; i < typeArgsValue.length; i++) {
                args[i] = arguments[i] || typeArgsValue[i];
            }
            // members处理
            for (let key in members) {
                if (typeArgsName.includes(members[key])) {
                    // 属性值为范型
                    let index = typeArgsName.indexOf(members[key]);
                    result[key] = args[index];
                }
                else if (this[members[key]]) {
                    // 属性值为类型
                    // 将类型拓展开的实现方式
                    // if (membersAgrs[key]) {
                    //     result[key] = (this as any)[members[key]](...membersAgrs[key])
                    // } else {
                    //     result[key] = (this as any)[members[key]]()
                    // }
                    // 将类型直接输出
                    result[key] = members[key];
                }
                else {
                    result[key] = members[key];
                }
            }
            return result;
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=typeFC.js.map
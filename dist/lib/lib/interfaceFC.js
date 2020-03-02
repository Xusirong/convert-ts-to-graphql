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
    // extends 处理
    let extendings = [];
    if (statement.heritageClauses) {
        statement.heritageClauses.forEach(heritage => {
            heritage.types.forEach(item => {
                let extendingsName = getName_1.handleIdentifier(item.expression);
                if (item.typeArguments) {
                    let agrs = item.typeArguments.map(i => {
                        return getName_1.handleIdentifier(i.typeName);
                    });
                    extendings.push({ name: extendingsName, args: agrs });
                }
                else {
                    extendings.push({ name: extendingsName });
                }
            });
        });
    }
    // 属性处理
    let members = {};
    let membersAgrs = {};
    statement.members.forEach(member => {
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
    return {
        name,
        function: function () {
            let result = {};
            // 参数处理
            let args = [];
            for (let i = 0; i < typeArgsValue.length; i++) {
                args[i] = arguments[i] || typeArgsValue[i];
            }
            // 继承处理
            extendings.forEach(extend => {
                if (extend.args) {
                    for (let key in extend.args) {
                        if (typeArgsName.includes(extend.args[key])) {
                            let index = typeArgsName.indexOf(extend.args[key]);
                            extend.args[key] = args[index];
                        }
                    }
                    Object.assign(result, this[extend.name](...extend.args));
                }
                else {
                    Object.assign(result, this[extend.name]());
                }
            });
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
//# sourceMappingURL=interfaceFC.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getName_1 = require("./getName");
const handlePropertySignature_1 = __importDefault(require("./handlePropertySignature"));
const getKeyworkType_1 = __importDefault(require("./getKeyworkType"));
function default_1(statement) {
    let name = getName_1.handleIdentifier(statement.name);
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
    let members = {};
    statement.members.forEach(member => {
        let [memberName, memberType] = handlePropertySignature_1.default(member);
        members[memberName] = memberType;
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
                    let index = typeArgsName.indexOf(members[key]);
                    result[key] = args[index];
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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getName_1 = require("./getName");
const handlePropertySignature_1 = __importDefault(require("./handlePropertySignature"));
function default_1(statement) {
    let name = getName_1.handleIdentifier(statement.name);
    let typeParameters = statement.typeParameters;
    let heritageClauses = statement.heritageClauses;
    let members = {};
    statement.members.forEach(member => {
        let [memberName, memberType] = handlePropertySignature_1.default(member);
        members[memberName] = memberType;
    });
    return {
        name,
        members,
        function: function () {
            let result = members;
            return result;
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=interfaceFC.js.map
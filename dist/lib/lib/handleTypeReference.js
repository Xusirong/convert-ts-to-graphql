"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const getName_1 = require("./getName");
const getKeyworkType_1 = __importDefault(require("./getKeyworkType"));
function default_1(type) {
    let typeArguments = [];
    if (type.typeArguments) {
        type.typeArguments.forEach(item => {
            typeArguments.push(getKeyworkType_1.default(item));
        });
    }
    let typeName;
    if (typescript_1.default.isIdentifier(type.typeName)) {
        typeName = getName_1.handleIdentifier(type.typeName);
    }
    else if (typescript_1.default.isQualifiedName(type.typeName)) {
        typeName = getName_1.handleIdentifier(type.typeName.right);
    }
    else {
        typeName = "any";
    }
    if (typeArguments.length > 0) {
        return [typeName, typeArguments];
    }
    else {
        return typeName;
    }
}
exports.default = default_1;
//# sourceMappingURL=handleTypeReference.js.map
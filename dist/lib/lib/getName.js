"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
function handlePropertyName(propertyName) {
    if (typescript_1.default.isIdentifier(propertyName)) {
        return handleIdentifier(propertyName);
    }
    if (typescript_1.default.isStringLiteral(propertyName)) {
        return handleStringLiteral(propertyName);
    }
    if (typescript_1.default.isNumericLiteral(propertyName)) {
        return handleNumericLiteral(propertyName);
    }
    // if(ts.isComputedPropertyName(propertyName)) {
    //     return handleComputedPropertyName(propertyName)
    // }
    return "properyName";
}
exports.handlePropertyName = handlePropertyName;
function handleIdentifier(identifier) {
    return identifier.text;
}
exports.handleIdentifier = handleIdentifier;
function handleStringLiteral(stringLiteral) {
    return stringLiteral.text;
}
exports.handleStringLiteral = handleStringLiteral;
function handleNumericLiteral(numericLiteral) {
    return numericLiteral.text;
}
exports.handleNumericLiteral = handleNumericLiteral;
// export function handleComputedPropertyName(computedPropertyName: ts.ComputedPropertyName) {
//     return computedPropertyName.expression
// }
//# sourceMappingURL=getName.js.map
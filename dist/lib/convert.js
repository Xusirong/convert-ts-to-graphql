"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const fs_1 = __importDefault(require("fs"));
const interfaceFC_1 = __importDefault(require("./lib/interfaceFC"));
const typeFC_1 = __importDefault(require("./lib/typeFC"));
const util_1 = require("util");
function default_1(filePath, anyType) {
    const codeBuffer = fs_1.default.readFileSync(filePath);
    const code = codeBuffer.toString();
    const sourceFile = typescript_1.default.createSourceFile("ts", code, typescript_1.default.ScriptTarget.ES2015, true);
    const { statements } = sourceFile;
    let FCList = {};
    statements.forEach(statement => {
        const fcItem = createFCFromStatement(statement);
        if (fcItem) {
            FCList[fcItem.name] = fcItem.function.bind(FCList);
        }
    });
    let graphqlDSL = "";
    Object.keys(FCList).forEach(name => {
        const result = buildDSLFromTypeFC(name, FCList[name], anyType);
        if (result) {
            graphqlDSL += result;
        }
    });
    return graphqlDSL;
}
exports.default = default_1;
function createFCFromStatement(statement) {
    if (typescript_1.default.isInterfaceDeclaration(statement)) {
        return interfaceFC_1.default(statement);
    }
    if (typescript_1.default.isTypeAliasDeclaration(statement)) {
        return typeFC_1.default(statement);
    }
    return undefined;
}
const typeMapping = {
    "string": "String",
    "number": "Float",
    "boolean": "Boolean",
    "bigint": "Int"
};
function replacer(value, anyType) {
    if (util_1.isString(value)) {
        if (typeMapping[value]) {
            return typeMapping[value];
        }
        else {
            return anyType;
        }
    }
    else {
        return value;
    }
}
function buildDSLFromTypeFC(name, fcItem, anyType) {
    let body = JSON.stringify(fcItem(), (key, value) => replacer(value, anyType), 2).replace(/"/g, "");
    return `type ${name} ${body} \n\n`;
}
//# sourceMappingURL=convert.js.map
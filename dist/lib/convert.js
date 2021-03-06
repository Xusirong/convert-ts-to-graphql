"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const interfaceFC_1 = __importDefault(require("./lib/createFC/interfaceFC"));
const typeFC_1 = __importDefault(require("./lib/createFC/typeFC"));
const importFC_1 = __importDefault(require("./lib/createFC/importFC"));
const util_1 = require("util");
function default_1(code, anyType) {
    const sourceFile = typescript_1.default.createSourceFile("ts", code, typescript_1.default.ScriptTarget.ES2015, true);
    const { statements } = sourceFile;
    let FCList = {};
    let importList = [];
    statements.forEach(statement => {
        const fcItem = createFCFromStatement(statement);
        if (util_1.isArray(fcItem)) {
            fcItem.forEach(item => {
                FCList[item.name] = item.function.bind(FCList);
                importList.push(item.name);
            });
        }
        else if (fcItem) {
            FCList[fcItem.name] = fcItem.function.bind(FCList);
        }
    });
    let FCNameList = Object.keys(FCList);
    let graphqlDSL = "";
    FCNameList.forEach(name => {
        // import引入的类型不解析成type
        if (importList.includes(name)) {
            return;
        }
        const result = buildDSLFromTypeFC(name, FCList[name], FCNameList, anyType);
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
    if (typescript_1.default.isImportDeclaration(statement)) {
        return importFC_1.default(statement);
    }
    return undefined;
}
const typeMapping = {
    "string": "String",
    "number": "Float",
    "boolean": "Boolean",
    "bigint": "Int"
};
function replacer(value, FCNameList, anyType) {
    if (util_1.isString(value)) {
        if (typeMapping[value]) {
            return typeMapping[value];
        }
        else if (FCNameList.includes(value)) {
            return value;
        }
        else {
            return anyType;
        }
    }
    else {
        return value;
    }
}
function buildDSLFromTypeFC(name, fcItem, FCNameList, anyType) {
    let body = JSON.stringify(fcItem(), (key, value) => replacer(value, FCNameList, anyType), 2).replace(/"/g, "");
    return `type ${name} ${body} \n\n`;
}
//# sourceMappingURL=convert.js.map
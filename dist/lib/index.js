"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const fs_1 = __importDefault(require("fs"));
const interfaceFC_1 = __importDefault(require("./lib/interfaceFC"));
const typeFC_1 = __importDefault(require("./lib/typeFC"));
function default_1(filePath) {
    const codeBuffer = fs_1.default.readFileSync(filePath);
    const code = codeBuffer.toString();
    const sourceFile = typescript_1.default.createSourceFile("ts", code, typescript_1.default.ScriptTarget.ES2015, true);
    const { statements } = sourceFile;
    let FCList = {};
    statements.forEach(statement => {
        const fcItem = createFCFromStatement(statement);
        if (fcItem) {
            FCList[fcItem.name] = fcItem.function;
        }
    });
    let graphqlDSL = "";
    Object.keys(FCList).forEach(name => {
        const result = buildDSLFromTypeFC(name, FCList[name], FCList);
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
function buildDSLFromTypeFC(name, fcItem, fcList) {
    console.log(fcItem());
    return "is ok?";
}
//# sourceMappingURL=index.js.map
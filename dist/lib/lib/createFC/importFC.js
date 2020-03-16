"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const getName_1 = require("../getName");
function default_1(statement) {
    let exportDefaultType;
    let exportType = [];
    let importClause = statement.importClause;
    if (!importClause) {
        return [];
    }
    if (importClause.name) {
        exportDefaultType = getName_1.handleIdentifier(importClause.name);
    }
    if (importClause.namedBindings) {
        if (typescript_1.default.isNamedImports(importClause.namedBindings)) {
            importClause.namedBindings.elements.forEach(element => {
                exportType.push(getName_1.handleIdentifier(element.name));
            });
        }
        else {
            throw Error('暂不支持导出spaceImport');
        }
    }
    let allType = exportType;
    if (exportDefaultType) {
        allType.push(exportDefaultType);
    }
    return allType.map(item => {
        return {
            name: item,
            function: function () { return {}; }
        };
    });
}
exports.default = default_1;
//# sourceMappingURL=importFC.js.map
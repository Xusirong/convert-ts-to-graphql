"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getName_1 = require("./getName");
const getKeyworkType_1 = __importDefault(require("./getKeyworkType"));
function default_1(propertySignature) {
    let name = getName_1.handlePropertyName(propertySignature.name);
    let type = "any";
    if (propertySignature.type) {
        type = getKeyworkType_1.default(propertySignature.type);
    }
    return [name, type];
}
exports.default = default_1;
//# sourceMappingURL=handlePropertySignature.js.map
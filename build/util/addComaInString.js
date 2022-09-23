"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComaInString = void 0;
function addComaInString(textWithOutComa) {
    let textWithComa = '';
    for (let i = 0; i < textWithOutComa.length; i++) {
        if (i < textWithOutComa.length - 1) {
            textWithComa += `${textWithOutComa[i]},`;
        }
        else {
            textWithComa += `${textWithOutComa[i]}`;
        }
    }
    return textWithComa;
}
exports.addComaInString = addComaInString;

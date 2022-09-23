"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHoursNumberToString = void 0;
function convertHoursNumberToString(hoursAmount) {
    let [hours, minutes] = String((hoursAmount / 60)).split('.', 2);
    !minutes ? minutes = '0' : '';
    return `${String(hours).padStart(2, '0')}:${String(minutes).padEnd(2, '0').slice(0, 2)}`;
}
exports.convertHoursNumberToString = convertHoursNumberToString;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHoursStringToNumber = void 0;
// 18:00 to 1080
function convertHoursStringToNumber(hoursString) {
    const [hours, minutes] = hoursString.split(':', 2).map(i => parseInt(i));
    return Math.round((hours * 60) + (minutes * 60 / 100));
}
exports.convertHoursStringToNumber = convertHoursStringToNumber;

// 18:00 to 1080
export function convertHoursStringToNumber(hoursString: string){
    const [hours, minutes] = hoursString.split(':', 2).map(i => parseInt(i))
    return  (hours * 60) + (minutes * 60 / 100) 
}

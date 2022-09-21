function changeWeekDaysNumberToString(dayInNumber: string){
    if(dayInNumber === "0") return 'Domingo'
    if(dayInNumber === "1") return 'Segunda-feira'
    if(dayInNumber === "2") return 'Terça-feira'
    if(dayInNumber === "3") return 'Quarta-feira'
    if(dayInNumber === "4") return 'Quinta-feira'
    if(dayInNumber === "5") return 'Sexta-feira'
    if(dayInNumber === "6") return 'Sabado'
}
export function getArrayAndAplyChangeNumberToString(weekDays: any){
    const weekDaysFormatted = weekDays.map((dayInNumber: string) => {
        return changeWeekDaysNumberToString(dayInNumber)
    })
    return weekDaysFormatted
}
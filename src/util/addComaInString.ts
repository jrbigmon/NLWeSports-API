export function addComaInString(textWithOutComa: string){
    let textWithComa = ''
    for (let i = 0; i < textWithOutComa.length; i++){
        if(i < textWithOutComa.length - 1){
            textWithComa += `${textWithOutComa[i]},`
        } else {
            textWithComa += `${textWithOutComa[i]}`
        }
    }
    return textWithComa
}

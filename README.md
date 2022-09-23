# NLWeSports-API
## Sobre 
Essa api foi criada para utilização do projeto NLW eSports da Rocket Seat.

Para a entidade jogos, você pode listar todos ou até mesmo verificar um único jogo cadastrado no banco de dados.

Para a entidade Ads (Publicações), você pode listar todas as publicações, 
listar todas as publicações relacionadas a um jogo através do Id dele e por fim, criar uma nova publicação.

Essa api foi criada exclusivamente para utlizar com a Aplicação Web desenvolvida por mim. 

Segue o link para clonar o projeto React e utilizar o pacote completo: https://github.com/jrbigmon/NLWeSports-Web

## Como utilizar essa API
### A API já vem com o banco de dados SQLite no projeto com todas as publicações e jogos já cadastrados, nela também contém as migrations e models em sua raiz.

### Instale todas as dependências
```bash
npm install
```
### Após instalar, caso queira rodar em ambiente de desenvolvimento, rode:
```bash
npm run dev
```
### Ou utilize a build, com:
```bash
npm start
```

## Rotas para utilização da api, métodos - GET
### http://localhost:3000/nlw/api/games
```json
[
  {
    "id": "b303b219-b56b-4a1f-9c55-98241335a810",
    "title": "League of Legends",
    "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/21779-188x250.jpg",
    "_count": {
      "ads": 2
    }
  },
  {
    "id": "8a69e8e5-b22e-46d8-a0f9-300b8c7bf89a",
    "title": "Valorant",
    "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg",
    "_count": {
      "ads": 2
    }
  },
]  
```
### http://localhost:3000/nlw/api/games/{id}
### http://localhost:3000/nlw/api/games/8a69e8e5-b22e-46d8-a0f9-300b8c7bf89a
```json
{
    "id": "8a69e8e5-b22e-46d8-a0f9-300b8c7bf89a",
    "title": "Valorant",
    "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg",
    "_count": {
      "ads": 2
    }
}
```
### http://localhost:3000/nlw/api/games/ads
```json
[
  {
    "id": "954d3aa9-dec6-4631-8f9b-f5fd0013e313",
    "discord": "VagnerJr",
    "gameId": "e3d3bfaf-aeda-4d89-b827-37df992cf86d",
    "name": "JrTerriaga",
    "yearsPlaying": 2,
    "hourStart": "01:21",
    "hourEnd": "03:25",
    "weekDays": [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira"
    ],
    "useVoiceChannel": true,
    "game": {
      "id": "e3d3bfaf-aeda-4d89-b827-37df992cf86d",
      "title": "Dota 2",
      "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg"
    }
  },
]
```
### http://localhost:3000/nlw/api/games/{gameId}/ads
### http://localhost:3000/nlw/api/games/e3d3bfaf-aeda-4d89-b827-37df992cf86d/ads
```json
[
  {
    "id": "954d3aa9-dec6-4631-8f9b-f5fd0013e313",
    "gameId": "e3d3bfaf-aeda-4d89-b827-37df992cf86d",
    "discord": "VagnerJr",
    "hourStart": "01:21",
    "hourEnd": "03:25",
    "name": "JrTerriaga",
    "useVoiceChannel": true,
    "yearsPlaying": 2,
    "weekDays": [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira"
    ],
    "game": {
      "id": "e3d3bfaf-aeda-4d89-b827-37df992cf86d",
      "title": "Dota 2",
      "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg"
    }
  }
]
```
## Utilização da api, método - POST
### http://localhost:3000/nlw/api/ads
body
```json
{
  "gameId": string,
  "name": string,
  "useVoiceChannel": boolean,
  "weekDays": string (concatenação dos dias da semana, domingo = 0 e sabado = 6),
  "yearsPlaying": number (integer),
  "hourStart": time (string),
  "hourEnd": time (string),
  "discord": string
}
```
body
```json
{
  "gameId": "e3d3bfaf-aeda-4d89-b827-37df992cf86d",
  "name": "nameInGame",
  "useVoiceChannel": true,
  "weekDays": "0123456",
  "yearsPlaying": 2,
  "hourStart": "18:30",
  "hourEnd": "23:30",
  "discord": "myDiscord"
}
```
React
```ts
import axios from "axios"

const nlwApi = axios.create({
    baseURL: "http://localhost:3000/nlw/api"
})

interface Ad {
    gameId: string
    name: string 
    yearsPlaying: number
    discord: string
    weekDays: string
    hourStart: string
    hourEnd: string
    useVoiceChannel: boolean
}

async function SubmitForm (event:any, props:Ad) {
    event.preventDefault()
    const newAd = {
        gameId: props.gameId,
        name: props.name,
        yearsPlaying: props.yearsPlaying,
        discord: props.discord,
        weekDays: props.weekDays,
        hourStart: props.hourStart,
        hourEnd: props.hourEnd,
        useVoiceChannel: props.useVoiceChannel
    }
    await nlwApi.post('/ads', newAd)
}
export default SubmitForm
```
Para o tempo de jogo, tanto inicio como termino, existem funções para converter esses valores para numérico inteiro para inserir no banco de dados e depois o transforma novamente para string para os métodos de select (GET)
- POST
```typescript
// 18:00 to 1080
export function convertHoursStringToNumber(hoursString: string){
    const [hours, minutes] = hoursString.split(':', 2).map(i => parseInt(i))
    
    return  Math.round((hours * 60) + (minutes * 60 / 100)) 
}
```
- GET
```typescript
// 1080 to 18:00
export function convertHoursNumberToString (hoursAmount: number) {
    let [hours, minutes] = String(
            (hoursAmount / 60)
        ).split('.', 2)

        !minutes ? minutes = '0' : ''

    return `${String(hours).padStart(2, '0')}:${String(minutes).padEnd(2, '0').slice(0, 2)}`
}
```
Para os dias da semana, também foi criado uma lógica para armazenar no banco de dados uma string separada por virgula cada char dentro dela
- POST
```ts
// "0123456" to "0,1,2,3,4,5,6"
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
```
- GET
```ts
// "0,1,2" to ["Domingo", "Segunda-feira", "Terça-feira"]
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
```

## Ferramentas utilizadas
### Dev
```json
"devDependencies": {
    "@types/cors": "^2.8.12",
    "@types/express": "^4.17.13",
    "prisma": "^4.3.1",
    "ts-node-dev": "^2.0.0",
    "typescript": "^4.8.3"
 }
```
### Production
```json
"dependencies": {
    "@prisma/client": "^4.3.1",
    "cors": "^2.8.5",
    "express": "^4.18.1"
 }
```

## Muito obrigado!

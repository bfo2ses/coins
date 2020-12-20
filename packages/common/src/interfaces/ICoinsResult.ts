
export interface ICoinsResult {
    apiURL: string
    date: Date
    coins: ICoin[]
}


export interface ICoin {
    rank: number
    coin: string
    name: string
    price: number
    percentChangeLastHour: number
    percentChangeLastDay: number
    percentChangeLastWeek: number
    marketCap: number
    volumeLastDay: number
}

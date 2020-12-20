export interface IApiResult {
    id: number
    name: string
    symbol: string
    website_slug: string
    rank: number
    circulating_supply: number
    total_supply: number
    max_supply: number
    quotes: {
        [key: string]: {
            price: number
            volume_24h: number
            market_cap: number
            percent_change_1h: number
            percent_change_24h: number
            percent_change_7d: number
        }
    }
    last_updated: number
}

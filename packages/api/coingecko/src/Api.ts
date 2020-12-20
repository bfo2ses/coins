import { IApiCoin, IApi, IApiFetchCoinsDataParams, IApiFetcher, ICoin, ICLISortOption, SortOrders } from '@coins/common'
import { IApiResult } from './interfaces'

export class Api implements IApi {

    baseURL = 'https://api.coingecko.com/api/v3'
    private fetcher: IApiFetcher

    constructor(fetcher: IApiFetcher) {
        this.fetcher = fetcher
    }

    private async fetchCoinsList(): Promise<IApiCoin[]> {
        const result = await this.fetcher.get<IApiCoin[]>(`/coins/list`)
        return result
    }

    async fetchCoinsData({ coins, currency, sort }: IApiFetchCoinsDataParams): Promise<ICoin[]> {
        const coinIds = await this.getCoinIds(coins)
        const result = await this.fetcher.get<IApiResult[]>(`/coins/markets?vs_currency=${currency}&sparkline=false&price_change_percentage=1h,24h,7d&ids=${coinIds.join(',')}`)
        return result
                .map(this.mapper)
                .sort((itemA: ICoin, itemB: ICoin) => this.sort(itemA, itemB, sort))
    }

    private async getCoinIds(coinSymbols: string[]): Promise<number[]> {
        const result = await this.fetchCoinsList()
        return result.reduce((reducer: any, coin: IApiCoin) => {
            if (coinSymbols.indexOf(coin.symbol) >= 0) reducer.push(coin.id)
            return reducer
        }, [])
    }

    private sort(itemA: ICoin, itemB: ICoin, sort?: ICLISortOption): number {
        if (!sort) return -1
        return (itemA as any)[sort.key] <= (itemB as any)[sort.key] ? sort.order === SortOrders.ASC ? -1 : 1 : sort.order === SortOrders.ASC ? 1 : -1
    }

    private mapper(apiItem: IApiResult): ICoin {
        return {
            rank: apiItem.market_cap_rank,
            coin: apiItem.symbol,
            name: apiItem.name,
            price: apiItem.current_price,
            percentChangeLastHour: apiItem.price_change_percentage_1h_in_currency,
            percentChangeLastDay: apiItem.price_change_percentage_24h_in_currency,
            percentChangeLastWeek: apiItem.price_change_percentage_7d_in_currency,
            marketCap: apiItem.market_cap,
            volumeLastDay: apiItem.total_volume
        }
    }

}
import { IApiCoin, IApi, IApiFetchCoinsDataParams, IApiFetcher, ICoin, ICLISortOption, SortOrders } from '@coins/common'
import { IApiResult } from './interfaces'

export class Api implements IApi {

    baseURL = 'https://api.alternative.me/v2'
    private fetcher: IApiFetcher

    constructor(fetcher: IApiFetcher) {
        this.fetcher = fetcher
    }

    private async fetchCoinsList(): Promise<IApiCoin[]> {
        const result = await this.fetcher.get<{ data: IApiCoin[] }>(`/listings`)
        return result.data
    }

    async fetchCoinsData({ coins, sort, currency }: IApiFetchCoinsDataParams): Promise<ICoin[]> {
        const coinIds = await this.getCoinIds(coins)
        const result = await Promise.all(coinIds.map(async coinId => {
            const result = await this.fetcher.get<{ data: { [coinId: number]: IApiResult } }>(`/ticker/${coinId}/?convert=${currency}`)
            return this.mapper(result.data[coinId], currency)
        }))
        return result
            .sort((itemA: ICoin, itemB: ICoin) => this.sort(itemA, itemB, sort))
    }

    private async getCoinIds(coinSymbols: string[]): Promise<number[]> {
        const result = await this.fetchCoinsList()
        return result.reduce((reducer: any, coin: IApiCoin) => {
            if (coinSymbols.indexOf(coin.symbol.toLowerCase()) >= 0) reducer.push(coin.id)
            return reducer
        }, [])
    }

    private sort(itemA: ICoin, itemB: ICoin, sort?: ICLISortOption): number {
        if (!sort) return -1
        return (itemA as any)[sort.key] <= (itemB as any)[sort.key] ? sort.order === SortOrders.ASC ? -1 : 1 : sort.order === SortOrders.ASC ? 1 : -1
    }

    private mapper(apiItem: IApiResult, currency: string): ICoin {
        return {
            rank: apiItem.rank,
            coin: apiItem.symbol,
            name: apiItem.name,
            price: apiItem.quotes[currency].price,
            percentChangeLastHour: apiItem.quotes[currency].percent_change_1h,
            percentChangeLastDay: apiItem.quotes[currency].percent_change_24h,
            percentChangeLastWeek: apiItem.quotes[currency].percent_change_7d,
            marketCap: apiItem.quotes[currency].market_cap,
            volumeLastDay: apiItem.quotes[currency].volume_24h
        }
    }

}
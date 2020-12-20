import { ICoin } from './ICoinsResult'
import { ICLISortOption } from './ICLIOptions'

export interface IApi {
    baseURL: string
    fetchCoinsData(params: IApiFetchCoinsDataParams): Promise<ICoin[]>
}

export interface IApiCoin {
    id: number | string
    symbol: string
    name: string
}

export interface IApiFetcher {
    get<T>(url: string): Promise<T>
}

export interface IApiFetchCoinsDataParams {
    coins: string[]
    currency: string
    sort?: ICLISortOption
}
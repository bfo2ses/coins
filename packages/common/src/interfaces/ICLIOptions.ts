import { Currencies, Lang, SortOrders } from '../enums'

export interface ICLIOptions {
    autorefresh: number | null
    coins: string[]
    lang: Lang
    currency: Currencies
    display: string
    fetcher: string
    help: boolean | null
    sort?: ICLISortOption
}

export interface ICLISortOption {
    key: string
    order: SortOrders
}

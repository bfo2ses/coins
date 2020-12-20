import { IApiResult } from './interfaces'
import { IApiCoin } from '@coins/common'
import { Api } from './Api'
import { SortOrders } from '../../../common/dist'


const apiResultTickkers: IApiResult[] = [
    {
        "id": 1,
        "name": "Bitcoin",
        "symbol": "BTC",
        "website_slug": "bitcoin",
        "rank": 1,
        "circulating_supply": 17277650,
        "total_supply": 17277650,
        "max_supply": 21000000,
        "quotes": {
            "USD": {
                "price": 6420.75294203,
                "volume_24h": 4234633625.35,
                "market_cap": 110935522069,
                "percent_change_1h": 0.08,
                "percent_change_24h": 0.89,
                "percent_change_7d": -0.26
            }
        },
        "last_updated": 1537430662
    },
    {
        "id": 2,
        "name": "Ethereum",
        "symbol": "ETH",
        "website_slug": "ethereum",
        "rank": 4,
        "circulating_supply": 17277650,
        "total_supply": 17277650,
        "max_supply": 21000000,
        "quotes": {
            "USD": {
                "price": 6420.75294203,
                "volume_24h": 4234633625.35,
                "market_cap": 110935522069,
                "percent_change_1h": 0.08,
                "percent_change_24h": 0.89,
                "percent_change_7d": -0.26
            }
        },
        "last_updated": 1537430662
    }
]

const availableCoins: IApiCoin[] = [
    {
        id: 1,
        symbol: 'BTC',
        name: 'Bitcoin'
    },
    {
        id: 2,
        symbol: 'ETH',
        name: 'Ethereum'
    }
]

describe('Alternative Fetcher', () => {

    describe('fetchCoinsData', () => {
        test('normal', async () => {
            const get = jest.fn()
                .mockResolvedValueOnce({
                    data: availableCoins
                })
                .mockResolvedValueOnce({
                    data: {
                        [apiResultTickkers[0].id]: apiResultTickkers[0]

                    }
                })
                .mockResolvedValueOnce({
                    data: {
                        [apiResultTickkers[1].id]: apiResultTickkers[1]

                    }
                })

            const result = await getApi(get).fetchCoinsData({
                coins: ['btc', 'eth'],
                currency: 'USD'
            })

            expect(result).toEqual([
                {
                    coin: "ETH",
                    marketCap: 110935522069,
                    name: "Ethereum",
                    percentChangeLastDay: 0.89,
                    percentChangeLastHour: 0.08,
                    percentChangeLastWeek: -0.26,
                    price: 6420.75294203,
                    rank: 4,
                    volumeLastDay: 4234633625.35,
                },
                {
                    coin: "BTC",
                    marketCap: 110935522069,
                    name: "Bitcoin",
                    percentChangeLastDay: 0.89,
                    percentChangeLastHour: 0.08,
                    percentChangeLastWeek: -0.26,
                    price: 6420.75294203,
                    rank: 1,
                    volumeLastDay: 4234633625.35,
                },
            ])
            expect(get).toHaveBeenCalledTimes(3)
            expect(get).toHaveBeenNthCalledWith(1, '/listings')
            expect(get).toHaveBeenNthCalledWith(2, '/ticker/1/?convert=USD')
            expect(get).toHaveBeenNthCalledWith(3, '/ticker/2/?convert=USD')
        })

        test('unknwon symbol', async () => {
            const get = jest.fn()
                .mockResolvedValueOnce({
                    data: availableCoins
                })
                .mockResolvedValueOnce({
                    data: {
                        [apiResultTickkers[0].id]: apiResultTickkers[0]

                    }
                })
                .mockResolvedValueOnce({
                    data: {
                        [apiResultTickkers[1].id]: apiResultTickkers[1]

                    }
                })

            const result = await getApi(get).fetchCoinsData({
                coins: ['btc', 'eth', 'test'],
                currency: 'USD'
            })

            expect(result).toEqual([
                {
                    coin: "ETH",
                    marketCap: 110935522069,
                    name: "Ethereum",
                    percentChangeLastDay: 0.89,
                    percentChangeLastHour: 0.08,
                    percentChangeLastWeek: -0.26,
                    price: 6420.75294203,
                    rank: 4,
                    volumeLastDay: 4234633625.35,
                },
                {
                    coin: "BTC",
                    marketCap: 110935522069,
                    name: "Bitcoin",
                    percentChangeLastDay: 0.89,
                    percentChangeLastHour: 0.08,
                    percentChangeLastWeek: -0.26,
                    price: 6420.75294203,
                    rank: 1,
                    volumeLastDay: 4234633625.35,
                },
            ])
            expect(get).toHaveBeenCalledTimes(3)
            expect(get).toHaveBeenNthCalledWith(1, '/listings')
            expect(get).toHaveBeenNthCalledWith(2, '/ticker/1/?convert=USD')
            expect(get).toHaveBeenNthCalledWith(3, '/ticker/2/?convert=USD')
        })

        describe('sort', () => {
            test(SortOrders.ASC, async () => {
                const get = jest.fn()
                    .mockResolvedValueOnce({
                        data: availableCoins
                    })
                    .mockResolvedValueOnce({
                        data: {
                            [apiResultTickkers[0].id]: apiResultTickkers[0]

                        }
                    })
                    .mockResolvedValueOnce({
                        data: {
                            [apiResultTickkers[1].id]: apiResultTickkers[1]

                        }
                    })

                const result = await getApi(get).fetchCoinsData({
                    coins: ['btc', 'eth'],
                    currency: 'USD',
                    sort: {
                        key: 'name',
                        order: SortOrders.ASC
                    }
                })

                expect(result).toEqual([
                    {
                        coin: "BTC",
                        marketCap: 110935522069,
                        name: "Bitcoin",
                        percentChangeLastDay: 0.89,
                        percentChangeLastHour: 0.08,
                        percentChangeLastWeek: -0.26,
                        price: 6420.75294203,
                        rank: 1,
                        volumeLastDay: 4234633625.35,
                    },
                    {
                        coin: "ETH",
                        marketCap: 110935522069,
                        name: "Ethereum",
                        percentChangeLastDay: 0.89,
                        percentChangeLastHour: 0.08,
                        percentChangeLastWeek: -0.26,
                        price: 6420.75294203,
                        rank: 4,
                        volumeLastDay: 4234633625.35,
                    },
                ])
                expect(get).toHaveBeenCalledTimes(3)
                expect(get).toHaveBeenNthCalledWith(1, '/listings')
                expect(get).toHaveBeenNthCalledWith(2, '/ticker/1/?convert=USD')
                expect(get).toHaveBeenNthCalledWith(3, '/ticker/2/?convert=USD')
            })
            test(SortOrders.DESC, async () => {
                const get = jest.fn()
                    .mockResolvedValueOnce({
                        data: availableCoins
                    })
                    .mockResolvedValueOnce({
                        data: {
                            [apiResultTickkers[0].id]: apiResultTickkers[0]

                        }
                    })
                    .mockResolvedValueOnce({
                        data: {
                            [apiResultTickkers[1].id]: apiResultTickkers[1]

                        }
                    })

                const result = await getApi(get).fetchCoinsData({
                    coins: ['btc', 'eth'],
                    currency: 'USD',
                    sort: {
                        key: 'name',
                        order: SortOrders.DESC
                    }
                })

                expect(result).toEqual([
                    {
                        coin: "ETH",
                        marketCap: 110935522069,
                        name: "Ethereum",
                        percentChangeLastDay: 0.89,
                        percentChangeLastHour: 0.08,
                        percentChangeLastWeek: -0.26,
                        price: 6420.75294203,
                        rank: 4,
                        volumeLastDay: 4234633625.35,
                    },
                    {
                        coin: "BTC",
                        marketCap: 110935522069,
                        name: "Bitcoin",
                        percentChangeLastDay: 0.89,
                        percentChangeLastHour: 0.08,
                        percentChangeLastWeek: -0.26,
                        price: 6420.75294203,
                        rank: 1,
                        volumeLastDay: 4234633625.35,
                    },
                ])
                expect(get).toHaveBeenCalledTimes(3)
                expect(get).toHaveBeenNthCalledWith(1, '/listings')
                expect(get).toHaveBeenNthCalledWith(2, '/ticker/1/?convert=USD')
                expect(get).toHaveBeenNthCalledWith(3, '/ticker/2/?convert=USD')
            })
        })
    })

})


const getApi = (get: () => void) => {
    const mock = jest.fn().mockImplementation(() => ({
        get
    }))
    return new Api(mock())
}
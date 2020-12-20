import { IApiCoin } from '@coins/common'
import { IApiResult } from 'interfaces'
import { SortOrders } from '../../../common/dist'
import { Api } from './Api'



const expected: IApiResult[] = [
    {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin",
        "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        "current_price": 20737,
        "market_cap": 384787890115,
        "market_cap_rank": 1,
        "fully_diluted_valuation": 435071999414,
        "total_volume": 35417994689,
        "high_24h": 20816,
        "low_24h": 19286.09,
        "price_change_24h": 1362.92,
        "price_change_percentage_24h": 7.03483,
        "market_cap_change_24h": 24593095876,
        "market_cap_change_percentage_24h": 6.82772,
        "circulating_supply": 18572893,
        "total_supply": 21000000,
        "max_supply": 21000000,
        "ath": 20816,
        "ath_change_percentage": -0.06346,
        "ath_date": "2020-12-16T17:02:30.594Z",
        "atl": 67.81,
        "atl_change_percentage": 30578.33367,
        "atl_date": "2013-07-06T00:00:00.000Z",
        "roi": null,
        "last_updated": "2020-12-16T21:30:16.851Z",
        "price_change_percentage_1h_in_currency": -0.2802517224373922,
        "price_change_percentage_24h_in_currency": 7.034826618052856,
        "price_change_percentage_7d_in_currency": 13.090223549383396
    },
    {
        "id": "eth",
        "symbol": "eth",
        "name": "Etherium",
        "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        "current_price": 20737,
        "market_cap": 384787890115,
        "market_cap_rank": 1,
        "fully_diluted_valuation": 435071999414,
        "total_volume": 35417994689,
        "high_24h": 20816,
        "low_24h": 19286.09,
        "price_change_24h": 1362.92,
        "price_change_percentage_24h": 7.03483,
        "market_cap_change_24h": 24593095876,
        "market_cap_change_percentage_24h": 6.82772,
        "circulating_supply": 18572893,
        "total_supply": 21000000,
        "max_supply": 21000000,
        "ath": 20816,
        "ath_change_percentage": -0.06346,
        "ath_date": "2020-12-16T17:02:30.594Z",
        "atl": 67.81,
        "atl_change_percentage": 30578.33367,
        "atl_date": "2013-07-06T00:00:00.000Z",
        "roi": null,
        "last_updated": "2020-12-16T21:30:16.851Z",
        "price_change_percentage_1h_in_currency": -0.2802517224373922,
        "price_change_percentage_24h_in_currency": 7.034826618052856,
        "price_change_percentage_7d_in_currency": 13.090223549383396
    }
]

const availableCoins: IApiCoin[] = [
    {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin'
    },
    {
        id: 'eth',
        symbol: 'eth',
        name: 'Etherium'
    }
]


describe('Coingecko Api', () => {

    describe('fetchCoinsData', () => {
        test('normal', async () => {
            const get = jest.fn()
                .mockResolvedValueOnce(availableCoins)
                .mockResolvedValueOnce([expected[0]])

            const result = await getApi(get).fetchCoinsData({
                coins: ['btc'],
                currency: 'EUR'
            })

            expect(result).toEqual([
                {
                    coin: "btc",
                    marketCap: 384787890115,
                    name: "Bitcoin",
                    percentChangeLastDay: 7.034826618052856,
                    percentChangeLastHour: -0.2802517224373922,
                    percentChangeLastWeek: 13.090223549383396,
                    price: 20737,
                    rank: 1,
                    volumeLastDay: 35417994689
                }
            ])
            expect(get).toHaveBeenNthCalledWith(1, '/coins/list')
            expect(get).toHaveBeenNthCalledWith(2, '/coins/markets?vs_currency=EUR&sparkline=false&price_change_percentage=1h,24h,7d&ids=bitcoin')
        })

        test('unknow symbol', async () => {
            const get = jest.fn()
                .mockResolvedValueOnce(availableCoins)
                .mockResolvedValueOnce([expected[0]])

            const result = await getApi(get).fetchCoinsData({
                coins: ['btc', 'test'],
                currency: 'EUR'
            })

            expect(result).toEqual([
                {
                    coin: "btc",
                    marketCap: 384787890115,
                    name: "Bitcoin",
                    percentChangeLastDay: 7.034826618052856,
                    percentChangeLastHour: -0.2802517224373922,
                    percentChangeLastWeek: 13.090223549383396,
                    price: 20737,
                    rank: 1,
                    volumeLastDay: 35417994689
                }
            ])
            expect(get).toHaveBeenNthCalledWith(1, '/coins/list')
            expect(get).toHaveBeenNthCalledWith(2, '/coins/markets?vs_currency=EUR&sparkline=false&price_change_percentage=1h,24h,7d&ids=bitcoin')
        })

        describe('sort', () => {
            test(SortOrders.ASC, async () => {
                const get = jest.fn()
                    .mockResolvedValueOnce(availableCoins)
                    .mockResolvedValueOnce(expected)

                const result = await getApi(get).fetchCoinsData({
                    coins: ['btc', 'eth'],
                    currency: 'EUR',
                    sort: {
                        key: 'name',
                        order: SortOrders.ASC
                    }
                })

                expect(result).toEqual([
                    {
                        coin: "btc",
                        marketCap: 384787890115,
                        name: "Bitcoin",
                        percentChangeLastDay: 7.034826618052856,
                        percentChangeLastHour: -0.2802517224373922,
                        percentChangeLastWeek: 13.090223549383396,
                        price: 20737,
                        rank: 1,
                        volumeLastDay: 35417994689
                    },
                    {
                        coin: "eth",
                        marketCap: 384787890115,
                        name: "Etherium",
                        percentChangeLastDay: 7.034826618052856,
                        percentChangeLastHour: -0.2802517224373922,
                        percentChangeLastWeek: 13.090223549383396,
                        price: 20737,
                        rank: 1,
                        volumeLastDay: 35417994689
                    }
                ])
                expect(get).toHaveBeenNthCalledWith(1, '/coins/list')
                expect(get).toHaveBeenNthCalledWith(2, '/coins/markets?vs_currency=EUR&sparkline=false&price_change_percentage=1h,24h,7d&ids=bitcoin,eth')
            })
            test(SortOrders.DESC, async () => {
                const get = jest.fn()
                    .mockResolvedValueOnce(availableCoins)
                    .mockResolvedValueOnce(expected)

                const result = await getApi(get).fetchCoinsData({
                    coins: ['btc', 'eth'],
                    currency: 'EUR',
                    sort: {
                        key: 'name',
                        order: SortOrders.DESC
                    }
                })

                expect(result).toEqual([
                    {
                        coin: "eth",
                        marketCap: 384787890115,
                        name: "Etherium",
                        percentChangeLastDay: 7.034826618052856,
                        percentChangeLastHour: -0.2802517224373922,
                        percentChangeLastWeek: 13.090223549383396,
                        price: 20737,
                        rank: 1,
                        volumeLastDay: 35417994689
                    },
                    {
                        coin: "btc",
                        marketCap: 384787890115,
                        name: "Bitcoin",
                        percentChangeLastDay: 7.034826618052856,
                        percentChangeLastHour: -0.2802517224373922,
                        percentChangeLastWeek: 13.090223549383396,
                        price: 20737,
                        rank: 1,
                        volumeLastDay: 35417994689
                    }
                ])
                expect(get).toHaveBeenNthCalledWith(1, '/coins/list')
                expect(get).toHaveBeenNthCalledWith(2, '/coins/markets?vs_currency=EUR&sparkline=false&price_change_percentage=1h,24h,7d&ids=bitcoin,eth')
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
import dayjs from 'dayjs'
import Table from 'tty-table'
import { IApi, ICLIOptions, IDisplay } from '@coins/common'
import { Formatter } from './Formatter'
import { translations } from './translations'

const headerColor = 'yellowBright'

export class Display implements IDisplay {
    private api: IApi

    private getHeaders({ currency, lang }: ICLIOptions, translations: any) {
        return [
            {
                value: 'rank',
                alias: translations[lang]['Rank'],
                headerColor,
                align: 'left',
                width: 6,
                formatter: (rank: number) => `#${rank}`
            },
            {
                value: 'coin',
                alias: translations[lang]['Coin'],
                align: 'left',
                headerColor,
                width: 10,
                formatter: function (coin: string) {
                    return coin.toUpperCase()
                }
            },
            {
                value: 'name',
                alias: translations[lang]['Name'],
                align: 'left',
                headerColor,
                width: 20,
                formatter: (name: string) => name
            },
            {
                value: 'price',
                alias: `${translations[lang]['Price']} (${currency})`,
                align: 'left',
                headerColor,
                width: 20,
                formatter: function (price: number) {
                    return Formatter.currency(price, lang, currency)
                }
            },
            {
                value: 'percentChangeLastHour',
                alias: `${translations[lang]['Change']} 1H (%)`,
                align: 'left',
                headerColor,
                width: 18,
                formatter: function (change: number) {
                    return Formatter.percentage(change, lang, (this as any).style)
                }
            },
            {
                value: 'percentChangeLastDay',
                alias: `${translations[lang]['Change']} 24H (%)`,
                align: 'left',
                headerColor,
                width: 18,
                formatter: function (change: number) {
                    return Formatter.percentage(change, lang, (this as any).style)
                }
            },
            {
                value: 'percentChangeLastWeek',
                alias: `${translations[lang]['Change']} 7D (%)`,
                align: 'left',
                headerColor,
                width: 18,
                formatter: function (change: number) {
                    return Formatter.percentage(change, lang, (this as any).style)
                }
            },
            {
                value: 'marketCap',
                alias: `${translations[lang]['MarketCap']} (${currency})`,
                align: 'left',
                headerColor,
                width: 25,
                formatter: function (marketCap: number) {
                    return Formatter.currency(marketCap, lang, currency)
                }
            },
            {
                value: 'volumeLastDay',
                alias: `${translations[lang]['Volume']} 24H (${currency})`,
                align: 'left',
                headerColor,
                width: 25,
                formatter: function (volume: number) {
                    return Formatter.currency(volume, lang, currency)
                }
            }
        ]
    }

    async printResult(options: ICLIOptions) {
        const trans = translations as any
        const result = await this.api.fetchCoinsData(options)
        const table = Table(
            this.getHeaders(options, trans),
            result
        )
        const tableResult = table.render()
        
        console.clear()
        console.log(trans[options.lang].refresh(this.api.baseURL, dayjs(new Date()).format('HH:mm:ss')))
        console.log(tableResult)
        if (!!options.autorefresh) {
            console.log(trans[options.lang].stop)
            setTimeout(
                async () => {
                    await this.printResult(options)
                }
                , options.autorefresh * 1000
            )
        }
    }

    printError(e: any) {
        console.error(e)
    }

    setApi(api: IApi) {
        this.api = api
        return this
    }

}
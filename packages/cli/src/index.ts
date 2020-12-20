import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { SortOrders, Currencies, Lang } from '@coins/common'


import { Displays, Apis } from './enums'
import { CLI } from './CLI'

const optionsDefinition = [
    {
        name: 'coins', type: (coins: string) => coins.split(','), defaultOption: true, description: 'List of cryptocurrency\'s symbols separated by a comma'
    },
    {
        name: 'help', alias: 'h', type: Boolean, description: 'Display how to use the cli command'
    },
    {
        name: 'api', alias: 'a', type: String, defaultValue: Apis.COINGECKO, description: `Which api to use (${Object.values(Apis).join(', ')})`
    },
    {
        name: 'currency', alias: 'c', type: String, defaultValue: Currencies.USD, description: `Which currency to use (${Object.values(Currencies).join(', ')})`
    },
    {
        name: 'display', alias: 'd', type: String, defaultValue: Displays.PRETTY_CONSOLE, description: `Which display to use (${Object.values(Displays).join(', ')})`
    },
    {
        name: 'lang', alias: 'l', type: String, defaultValue: Lang.US, description: `Which lang to use (${Object.values(Lang).join(', ')})`
    },
    {
        name: 'autorefresh', alias: 'r', type: Number, description: `If set, time in seconds between a refresh`
    },
    {
        name: 'sort', alias: 's', type: (param: string) => {
            const split = param.split('=')
            return {
                key: split[0],
                order: split[1] || SortOrders.ASC,
            }
        }, description: `Which sort to apply key(=${SortOrders.ASC}) or key=${SortOrders.DESC}`
    }
]
const usageDefinition = [
    {
        header: 'Coins CLI',
        content: 'Fetch and display a table of cryptocurrencies prices and other data'
    },
    {
        header: 'Options',
        optionList: optionsDefinition
    }
]
const usage = commandLineUsage(usageDefinition)
try {
    new CLI(commandLineArgs(optionsDefinition), usage)
        .validateCommand()
        .start()
} catch (e) {
    console.error(usage)
}
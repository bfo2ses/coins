import { Lang } from '@coins/common'

export const translations = {
    [Lang.US]: {
        'refresh': (apiURL: string, hour: string) => `Prices successfully refreshed ! From ${apiURL} at ${hour}`,
        'stop': 'Press CTRL + C to stop',
        'Rank': 'Rank',
        'Coin': 'Coin',
        'Name': 'Name',
        'Price': 'Price',
        'Change': 'Change',
        'MarketCap': 'Market Cap',
        'Volume': 'Volume',
    },
    [Lang.FR]: {
        'refresh': (apiURL: string, hour: string) => `Prix actualisés ! Depuis ${apiURL} à ${hour}`,
        'stop': 'Appuyez sur CTRL + C pour arrêter',
        'Rank': 'Rang',
        'Coin': 'Monnaie',
        'Name': 'Nom',
        'Price': 'Prix',
        'Change': 'Evolution',
        'MarketCap': 'Market Cap',
        'Volume': 'Volume',
    }
}
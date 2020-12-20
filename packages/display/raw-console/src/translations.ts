import { Lang } from '@coins/common'

export const translations = {
    [Lang.US]: {
        'refresh': (apiURL: string, hour: string) => `Prices successfully refreshed ! From ${apiURL} at ${hour}`,
        'stop': 'Press CTRL + C to stop',
    },
    [Lang.FR]: {
        'refresh': (apiURL: string, hour: string) => `Prix actualisés ! Depuis ${apiURL} à ${hour}`,
        'stop': 'Appuyez sur CTRL + C pour arrêter',
    }
}
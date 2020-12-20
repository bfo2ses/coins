import { Currencies, Lang } from '@coins/common'

export class Formatter {

    static currency(value: number, lang: Lang, currency: Currencies) {
        const options = { style: 'currency', minimumFractionDigits: 0, maximumFractionDigits: 4, currency }
        return new Intl.NumberFormat(this.getLanguage(lang), options).format(value)
    }

    static percentage(value: number, lang: Lang, style: (value: any, color: string) => string) {
        const percentage = new Intl.NumberFormat(this.getLanguage(lang), { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value / 100)
        return value < 0 ? style(percentage, 'red') : style('+' + percentage, 'green')
    }

    private static getLanguage(lang: Lang) {
        switch (lang) {
            case Lang.FR:
                return 'fr-FR'
            default:
                return 'en-US'
        }
    }
}
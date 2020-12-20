
import { Currencies, IApi, IDisplay, Lang } from '@coins/common'

import { Apis, Displays } from './enums'
import { ApiFactory } from './ApiFactory'
import { DisplayFactory } from './DisplayFactory'

export class CLI {

    constructor(
        private options: any,
        private usage: any
    ) { }

    validateCommand() {
        if (this.options.help || !this.validateArguments()) {
            throw this.usage
        }
        return this
    }
    private validateArguments() {
        if (!Object.values(Apis).includes(this.options.api)) {
            return false
        }
        if (!Object.values(Displays).includes(this.options.display)) {
            return false
        }
        if (this.options.hasOwnProperty('autorefresh') && (typeof this.options.autorefresh !== 'number' || Number.isNaN(this.options.autorefresh))) {
            return false
        }
        if (!Object.values(Lang).includes(this.options.lang)) {
            return false
        }
        if (!Object.values(Currencies).includes(this.options.currency)) {
            return false
        }
        if (!this.options.coins || this.options.coins.length === 0) {
            return false
        }
        return true
    }

    async start() {
        const api = ApiFactory.get(this.options.api)
        const display = DisplayFactory.get(this.options.display)
        try {
            display.setApi(api)
            display.printResult(this.options)
        } catch (e) {
            display.printError(e)
        }
    }

}
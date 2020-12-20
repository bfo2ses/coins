import { Apis, Displays } from './enums'
import { CLI } from './CLI'
import { Currencies, IDisplay, Lang } from '@coins/common'
import { ApiFactory } from './ApiFactory'
import { DisplayFactory } from './DisplayFactory'

jest.mock('./ApiFactory')
jest.mock('./DisplayFactory')

const defaultOptions = {
    display: Displays.PRETTY_CONSOLE,
    api: Apis.COINGECKO,
    lang: Lang.US,
    currency: Currencies.USD
}
const USAGE = 'USAGE'
describe('CLI', () => {
    describe('validateCommand', () => {
        test('--help,-h', () => {
            return expect(() => getCLI({
                ...defaultOptions,
                help: true
            }, USAGE).validateCommand()).toThrow(USAGE)
        })
        test('--display,-d other', () => {
            return expect(() => getCLI({
                ...defaultOptions,
                display: 'other'
            }, USAGE).validateCommand()).toThrow(USAGE)
        })
        test('--api,-a other', () => {
            return expect(() => getCLI({
                ...defaultOptions,
                api: 'other'
            }, USAGE).validateCommand()).toThrow(USAGE)
        })
        test('--autorefresh,-r other', () => {
            return expect(() => getCLI({
                ...defaultOptions,
                autorefresh: 'other'
            }, USAGE).validateCommand()).toThrow(USAGE)
        })
        test('--autorefresh,-r NaN', () => {
            return expect(() => getCLI({
                ...defaultOptions,
                autorefresh: NaN
            }, USAGE).validateCommand()).toThrow(USAGE)
        })
        test('--lang,-l other', () => {
            return expect(() => getCLI({
                ...defaultOptions,
                lang: 'other'
            }, USAGE).validateCommand()).toThrow(USAGE)
        })
        test('--currency,-c other', () => {
            return expect(() => getCLI({
                ...defaultOptions,
                currency: 'other'
            }, USAGE).validateCommand()).toThrow(USAGE)
        })
        test('<--coins> ', () => {
            expect(() => getCLI({
                ...defaultOptions,
                coins: []
            }, USAGE).validateCommand()).toThrow(USAGE)
        })
    })

    test('normal', async () => {
        const ApiFactoryGet = jest.fn()
        ApiFactory.get = ApiFactoryGet
        const setApi = jest.fn()
        const printResult = jest.fn()
        const printError = jest.fn()
        const DisplayFactoryGet = jest.fn((name: Displays) => ({
            setApi,
            printError,
            printResult
        }) as IDisplay)
        DisplayFactory.get = DisplayFactoryGet

        const options = {
            ...defaultOptions,
            coins: ['plop']
        }

        await getCLI(options, USAGE).start()

        expect(ApiFactoryGet).toHaveBeenCalledWith(defaultOptions.api)
        expect(DisplayFactoryGet).toHaveBeenCalledWith(defaultOptions.display)
        expect(printResult).toHaveBeenCalledWith(options)
        expect(printError).not.toHaveBeenCalled()
    })
})

const getCLI = (options: any, usage: any) => {
    return new CLI(options, usage)
}
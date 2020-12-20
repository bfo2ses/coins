import MockDate from 'mockdate'
import { Currencies, ICLIOptions, Lang } from '@coins/common'
import { Display } from './Display'

const error = jest.spyOn(console, 'error').mockImplementation()
const clear = jest.spyOn(console, 'clear').mockImplementation()
const log = jest.spyOn(console, 'log').mockImplementation()
const table = jest.spyOn(console, 'table').mockImplementation()
jest.useFakeTimers()


describe('Display', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('printResult', () => {
        test(`normal`, async () => {
            MockDate.set(new Date(2020, 11, 5, 17).getTime())
            const fetchCoinsData = jest.fn()
                .mockResolvedValue('table')
            const api = {
                baseURL: 'test',
                fetchCoinsData
            }
            const options = {
                coins: ['test'],
                lang: Lang.US,
                currency: Currencies.USD
            } as ICLIOptions

            await new Display()
                .setApi(api)
                .printResult(options)
            expect(clear).toHaveBeenCalledTimes(1)
            expect(fetchCoinsData).toHaveBeenCalledWith(options)
            expect(log).toHaveBeenCalledWith(`Prices successfully refreshed ! From ${api.baseURL} at 2020-12-05T16:00:00.000Z`)
            expect(table).toHaveBeenCalledWith(`table`)
        })

        test(`refresh`, async () => {
            MockDate.set(new Date(2020, 11, 5, 17).getTime())
            const fetchCoinsData = jest.fn()
                .mockResolvedValueOnce('table1')
                .mockResolvedValueOnce('table2')
            const api = {
                baseURL: 'test',
                fetchCoinsData
            }
            const options = {
                coins: ['test'],
                lang: Lang.FR,
                currency: Currencies.USD,
                autorefresh: 10
            } as ICLIOptions

            await new Display()
                .setApi(api)
                .printResult(options)

            jest.advanceTimersByTime(15000)
            await flushPromises()

            expect(clear).toHaveBeenCalledTimes(2)
            expect(fetchCoinsData).toHaveBeenCalledTimes(2)
            expect(fetchCoinsData).toHaveBeenCalledWith(options)
            expect(log).toHaveBeenCalledTimes(4)
            expect(log).toHaveBeenNthCalledWith(1, `Prix actualisés ! Depuis ${api.baseURL} à 2020-12-05T16:00:00.000Z`)
            expect(log).toHaveBeenNthCalledWith(2, `Appuyez sur CTRL + C pour arrêter`)
            expect(log).toHaveBeenNthCalledWith(3, `Prix actualisés ! Depuis ${api.baseURL} à 2020-12-05T16:00:00.000Z`)
            expect(log).toHaveBeenNthCalledWith(4, `Appuyez sur CTRL + C pour arrêter`)
            expect(table).toHaveBeenCalledTimes(2)
            expect(table).toHaveBeenNthCalledWith(1, `table1`)
            expect(table).toHaveBeenNthCalledWith(2, `table2`)
            expect(setTimeout).toHaveBeenLastCalledWith((expect.any(Function)), 10000)
            jest.clearAllTimers()
        })
    })

    test('printError', () => {
        new Display()
            .printError('error')

        expect(error).toHaveBeenCalledWith('error')
    })
})

const flushPromises = () => new Promise(res => process.nextTick(res))
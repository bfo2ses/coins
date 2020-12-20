import MockDate from 'mockdate'
import { Currencies, ICLIOptions, Lang } from '@coins/common'
import { Display } from './Display'

const mockRender = jest.fn()
jest.mock('tty-table', () => jest.fn(() => ({
    render: mockRender
})))
const error = jest.spyOn(global.console, 'error').mockImplementation()
const clear = jest.spyOn(global.console, 'clear').mockImplementation()
const log = jest.spyOn(global.console, 'log').mockImplementation()
jest.useFakeTimers()


describe('Display', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('printResult', () => {
        test(`normal ${Lang.US}`, async () => {
            MockDate.set(new Date(2020, 11, 5, 17).getTime())
            const fetchCoinsData = jest.fn()
                .mockResolvedValue('fetch')
            mockRender.mockReturnValue('table')
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
            expect(log).toHaveBeenNthCalledWith(1, `Prices successfully refreshed ! From ${api.baseURL} at 17:00:00`)
            expect(log).toHaveBeenNthCalledWith(2, `table`)
        })

        test(`normal ${Lang.FR}`, async () => {
            MockDate.set(new Date(2020, 11, 5, 17).getTime())
            const fetchCoinsData = jest.fn()
                .mockResolvedValue('fetch1')
                .mockResolvedValue('fetch2')
            mockRender
                .mockReturnValueOnce('table1')
                .mockReturnValueOnce('table2')
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
            expect(log).toHaveBeenCalledTimes(6)
            expect(log).toHaveBeenNthCalledWith(1, `Prix actualisés ! Depuis ${api.baseURL} à 17:00:00`)
            expect(log).toHaveBeenNthCalledWith(2, `table1`)
            expect(log).toHaveBeenNthCalledWith(3, `Appuyez sur CTRL + C pour arrêter`)
            expect(log).toHaveBeenNthCalledWith(4, `Prix actualisés ! Depuis ${api.baseURL} à 17:00:00`)
            expect(log).toHaveBeenNthCalledWith(5, `table2`)
            expect(log).toHaveBeenNthCalledWith(6, `Appuyez sur CTRL + C pour arrêter`)
            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000)
        })
    })

    test('printError', () => {
        new Display()
            .printError('error')

        expect(error).toHaveBeenCalledWith('error')
    })

})

const flushPromises = () => new Promise(res => process.nextTick(res))
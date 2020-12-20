import { Currencies, Lang } from '@coins/common'
import { Formatter } from './Formatter'

describe('Formatter', () => {

    describe('currency', () => {
        test(Lang.FR, () => {
            const value = Formatter.currency(2000.50, Lang.FR, Currencies.EUR)

            expect(value).toBe(`2 000,5 €`)
        })
        test(Lang.US, () => {
            const value = Formatter.currency(2000.50, Lang.US, Currencies.EUR)

            expect(value).toBe('€2,000.5')
        })
    })

    describe('percentage', () => {
        test(Lang.FR, () => {
            const mockStyle = jest.fn((value) => value)
            const value = Formatter.percentage(10.50, Lang.FR, mockStyle)
            
            expect(value).toBe(`+10,5 %`)
            expect(mockStyle).toHaveBeenCalledWith(`+10,5 %`, 'green')
        })
        test(Lang.US, () => {
            const mockStyle = jest.fn((value) => value)
            const value = Formatter.percentage(-10.50, Lang.US, mockStyle)
            
            expect(value).toBe(`-10.5%`)
            expect(mockStyle).toHaveBeenCalledWith(`-10.5%`, 'red')
        })
    })

})
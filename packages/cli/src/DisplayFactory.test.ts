import { DisplayFactory } from './DisplayFactory'
import { Displays } from './enums'
import { Display as PrettyConsoleDisplay } from '@coins/display-pretty-console'
import { Display as RawConsoleDisplay } from '@coins/display-raw-console'

describe('DisplayFactory', () => {

    test(Displays.PRETTY_CONSOLE, () => {
        const display = DisplayFactory.get(Displays.PRETTY_CONSOLE)

        expect(display).toBeInstanceOf(PrettyConsoleDisplay)
    })

    test(Displays.RAW_CONSOLE, () => {
        const display = DisplayFactory.get(Displays.RAW_CONSOLE)

        expect(display).toBeInstanceOf(RawConsoleDisplay)
    })

    test('other', () => {
        expect(() => DisplayFactory.get('other')).toThrowError()
    })

})

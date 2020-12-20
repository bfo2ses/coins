import { IDisplay } from '@coins/common'
import { Display as RawConsoleDisplay } from '@coins/display-raw-console'
import { Display as PrettyConsoleDisplay } from '@coins/display-pretty-console'
import { Displays } from './enums'

export class DisplayFactory {
    static get(name: string): IDisplay {
        switch (name) {
            case Displays.PRETTY_CONSOLE:
                return new PrettyConsoleDisplay()
            case Displays.RAW_CONSOLE:
                return new RawConsoleDisplay()
            default:
                throw new Error('Display not implemented')
        }
    }
}
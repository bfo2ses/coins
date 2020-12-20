import { ICLIOptions } from './ICLIOptions'
import { IApi } from './IApi'

export interface IDisplay {
    setApi: (api: IApi) => IDisplay
    printResult: (options: ICLIOptions) => Promise<void>
    printError: (e: any) => void
}
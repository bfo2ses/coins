import { IApi, ICLIOptions, IDisplay } from '@coins/common'

import { translations } from './translations'

export class Display implements IDisplay {
    private api: IApi

    async printResult(options: ICLIOptions) {
        console.clear()
        const result = await this.api.fetchCoinsData(options)
        console.log(translations[options.lang].refresh(this.api.baseURL, new Date().toISOString()))
        console.table(result)
        if (!!options.autorefresh) {
            console.log(translations[options.lang].stop)
            setTimeout(
                async () => {
                    await this.printResult(options)
                }
                , options.autorefresh * 1000
            )
        }
    }

    printError(e: any) {
        console.error(e)
    }

    setApi(api: IApi) {
        this.api = api
        return this
    }

}
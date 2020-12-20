import axios, { AxiosResponse } from 'axios'
import { IApi } from '@coins/common'
import { Api as AlternativeApi } from '@coins/api-alternative'
import { Api as CoingeckoApi } from '@coins/api-coingecko'
import { Apis } from './enums'

export class ApiFactory {
    static get(name: string): IApi {
        let api
        const instance = axios.create()
        instance.interceptors.response.use((response: AxiosResponse) => response.data)
        switch (name) {
            case Apis.ALTERNATIVE:
                api = new AlternativeApi(instance)
                break
            case Apis.COINGECKO:
                api = new CoingeckoApi(instance)
                break
            default:
                throw new Error('Api not implemented')
        }
        instance.defaults.baseURL = api.baseURL
        return api
    }
}
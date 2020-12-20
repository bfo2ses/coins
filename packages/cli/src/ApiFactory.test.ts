import { ApiFactory } from './ApiFactory'
import { Apis } from './enums'
import { Api as ApiAlternative } from '@coins/api-alternative'
import { Api as ApiCoingecko } from '@coins/api-coingecko'

describe('ApiFactory', () => {

    test(Apis.ALTERNATIVE, () => {
        const api = ApiFactory.get(Apis.ALTERNATIVE)

        expect(api).toBeInstanceOf(ApiAlternative)
    })

    test(Apis.COINGECKO, () => {
        const api = ApiFactory.get(Apis.COINGECKO)

        expect(api).toBeInstanceOf(ApiCoingecko)
    })

    test('other', () => {
        expect(() => ApiFactory.get('other')).toThrowError()
    })

})

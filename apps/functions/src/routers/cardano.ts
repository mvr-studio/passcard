import { Buffer } from 'buffer'
import { z } from 'zod'
import queryString from 'query-string'
import { router, publicProcedure } from '../trpc'
import { camelCase } from 'camel-case'

const KOIOS_URL = 'https://api.koios.rest/api/v0'
const ADA_HANDLE_POLICY = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'

const getAssetNameFromHex = (assetName: string) => Buffer.from(assetName, 'hex').toString()
const camelCaseKeys = (value: any) =>
  Object.fromEntries(Object.entries(value).map(([key, value]) => [camelCase(key), value]))

export const CardanoRouter = router({
  /**
   * @openapi
   * /trpc/protocolParameters:
   *  get:
   *    description: Get Cardano protocol parameters
   *    responses:
   *      200:
   *        description: success
   */
  protocolParameters: publicProcedure.query(async () => {
    const chainTipRequest = await fetch(`${KOIOS_URL}/tip`)
    const epochNo = (await chainTipRequest.json())[0].epoch_no
    const requestUrl = queryString.stringifyUrl({
      url: `${KOIOS_URL}/epoch_params`,
      query: {
        _epoch_no: epochNo
      }
    })
    const protocolParametersRequest = await fetch(requestUrl)
    const protocolParameters = camelCaseKeys((await protocolParametersRequest.json())[0])
    return {
      protocolParameters
    }
  }),
  /**
   * @openapi
   * /trpc/addressesToHandles:
   *  get:
   *    description: Get AdaHandles of given addresses
   *    parameters:
   *      - name: input
   *        in: query
   *        required: true
   *        type: object
   *        default: { "addresses": ["addr1qyajxk99kz4jmyc73u4fayugsmfd5e2yu5n5ltvrwrvmktpxk0s8ldv8j3q64afxrwasjwk8h4mw3cacdmvs62p5cj9qnhfu6t"] }
   *    responses:
   *      200:
   *        description: success
   */
  addressesToHandles: publicProcedure.input(z.object({ addresses: z.string().array() })).query(async ({ input }) => {
    const request = await fetch(`${KOIOS_URL}/address_assets`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        _addresses: input.addresses
      })
    })
    const json = await request.json()
    const handles = Object.fromEntries(
      json
        .filter((entry) => entry.asset_list.some((assets) => assets.policy_id.includes(ADA_HANDLE_POLICY)))
        .map((entry) => [entry.address, getAssetNameFromHex(entry.asset_list[0].asset_name)])
    )
    return { handles }
  }),
  /**
   * @openapi
   * /trpc/handleToAddress:
   *  get:
   *    description: Get AdaHandle's owner's address
   *    parameters:
   *      - name: input
   *        in: query
   *        required: true
   *        type: object
   *        default: { "handle": "mrcnk" }
   *    responses:
   *      200:
   *        description: success
   */
  handleToAddress: publicProcedure.input(z.object({ handle: z.string() })).query(async ({ input }) => {
    const handle = Buffer.from(input.handle).toString('hex')
    const requestUrl = queryString.stringifyUrl({
      url: `${KOIOS_URL}/asset_nft_address`,
      query: {
        _asset_policy: ADA_HANDLE_POLICY,
        _asset_name: handle
      }
    })
    const request = await fetch(requestUrl)
    const json = await request.json()
    return { address: json[0].payment_address }
  })
})

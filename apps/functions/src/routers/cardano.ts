import { Buffer } from 'buffer'
import { z } from 'zod'
import queryString from 'query-string'
import { router, publicProcedure } from '../trpc'

const KOIOS_URL = 'https://api.koios.rest/api/v0'
const ADA_HANDLE_POLICY = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'

const getAssetNameFromHex = (assetName: string) => Buffer.from(assetName, 'hex').toString()

export const CardanoRouter = router({
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
  handleToAddress: publicProcedure.input(z.object({ handle: z.string() })).query(async ({ input }) => {
    const handle = Buffer.from(input.handle).toString('hex')
    const requestUrl = queryString.stringifyUrl({
      url: `${KOIOS_URL}/asset_nft_address`,
      query: {
        _asset_policy: ADA_HANDLE_POLICY,
        _asset_name: handle
      }
    })
    console.log(requestUrl)
    const request = await fetch(requestUrl)
    const json = await request.json()
    return { address: json[0].payment_address }
  })
})

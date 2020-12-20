import got, { Got, OptionsOfJSONResponseBody } from 'got'

class Connection {
  client: Got

  constructor(user: string, key: string) {
    this.client = got.extend({
      prefixUrl: 'https://passthepopcorn.me/',
      headers: {
        ApiUser: user,
        ApiKey: key,
      },
    })
  }

  public async get(
    url: string,
    options: OptionsOfJSONResponseBody = {},
  ): Promise<string> {
    return (await this.client.get(url, options)).body as string
  }

  public async getJSON(
    url: string,
    options: OptionsOfJSONResponseBody = {},
  ): Promise<Record<string, unknown>> {
    options.responseType = 'json'
    return (await this.client.get(url, options)).body as Record<string, unknown>
  }
}

export default Connection

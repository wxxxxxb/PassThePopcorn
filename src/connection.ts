import got, { Got, OptionsOfJSONResponseBody } from 'got'

class Connection {
  client: Got
  capacity = 3
  tokens = 3
  fillPerSecond = 0.5

  constructor(user: string, key: string) {
    this.client = got.extend({
      prefixUrl: 'https://passthepopcorn.me/',
      retry: 0,
      headers: {
        ApiUser: user,
        ApiKey: key,
      },
    })

    setInterval(() => this.addToken(), 1000 / this.fillPerSecond)
  }

  private addToken() {
    if (this.tokens < this.capacity) {
      this.tokens += 1
    }
  }

  private consumeToken() {
    if (this.tokens > 0) {
      this.tokens -= 1
      return true
    }

    throw Error('Ratelimit')
  }

  public async get(
    url: string,
    options: OptionsOfJSONResponseBody = {},
  ): Promise<string> {
    this.consumeToken()

    return (await this.client.get(url, options)).body as string
  }

  public async getJSON(
    url: string,
    options: OptionsOfJSONResponseBody = {},
  ): Promise<Record<string, unknown>> {
    this.consumeToken()

    options.responseType = 'json'
    return (await this.client.get(url, options)).body as Record<string, unknown>
  }
}

export default Connection

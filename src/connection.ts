import got, {
  Got,
  OptionsOfJSONResponseBody,
  OptionsOfBufferResponseBody,
} from 'got'

class Connection {
  client: Got
  capacity = 3
  tokens = 3
  fillPerSecond = 0.5
  queue: { (value: true): void }[] = []
  maxQueueSize = 15

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
    if (this.queue.length > 0) {
      const resolve = this.queue.pop()
      this.tokens += 1
      resolve(true)
    }
  }

  private consumeToken() {
    if (this.tokens > 0) {
      this.tokens -= 1
      return true
    }

    if (this.queue.length >= this.maxQueueSize) {
      throw Error('Ratelimit')
    }

    let promiseResolve
    const promise = new Promise((resolve) => {
      promiseResolve = resolve
    })

    this.queue.push(promiseResolve)
    return promise
  }

  public async get(
    url: string,
    options: OptionsOfJSONResponseBody = {},
  ): Promise<string> {
    await this.consumeToken()

    return (await this.client.get(url, options)).body as string
  }

  public async getJSON(
    url: string,
    options: OptionsOfJSONResponseBody = {},
  ): Promise<Record<string, unknown>> {
    await this.consumeToken()

    options.responseType = 'json'
    return (await this.client.get(url, options)).body as Record<string, unknown>
  }

  public async getBuffer(
    url: string,
    options: OptionsOfBufferResponseBody = { responseType: 'buffer' },
  ): Promise<Buffer> {
    await this.consumeToken()

    options.responseType = 'buffer'
    return (await this.client.get(url, options)).body
  }
}

export default Connection

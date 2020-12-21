import Connection from './connection'
import Movie from './objects/movie'
import Torrent from './objects/torrent'

interface MovieSearchResult {
  Movies: Array<Record<string, any>>
}

interface TorrentSearchResult {
  GroupId: number
  Torrents: Array<Record<string, any>>
}

class Api {
  connection: Connection

  constructor(user: string, key: string) {
    this.connection = new Connection(user, key)
  }

  async getCurrentUserId(): Promise<number> {
    const response = await this.connection.get('index.php')
    const currentUser = response.match(/user.php\?id=(\d+)/)
    return Number(currentUser[1])
  }

  async search(query: string): Promise<Movie[]> {
    const response = ((await this.connection.getJSON('torrents.php', {
      searchParams: { searchstr: query, jsontrumpable: 1, jsonreports: 1 },
    })) as unknown) as MovieSearchResult
    return response.Movies.map(
      (movieData: Record<string, unknown>) => new Movie(movieData),
    )
  }

  async searchByImdbId(id: string): Promise<Movie> {
    return (await this.search(id))[0]
  }

  async getTorrentInfoById(torrentId: number): Promise<any> {
    let response
    try {
      response = ((await this.connection.getJSON('torrents.php', {
        searchParams: {
          torrentid: torrentId,
        },
      })) as unknown) as TorrentSearchResult
    } catch (err) {
      // if id is not found, ptp gives a 403
      // we do an extra check for the body to make sure it's not the credentials
      if (
        err.response &&
        err.response.statusCode === 403 &&
        err.response.body ===
          'This page is not allowed to be accessed by the API\n'
      ) {
        return false
      }
      throw err
    }

    const torrentData = response.Torrents.find(
      ({ Id }) => Number(Id) === torrentId,
    )
    return new Torrent(Number(response.GroupId), torrentData)
  }

  async getDescriptionForTorrent(torrent: Torrent): Promise<string> {
    const response = await this.connection.getJSON('torrents.php', {
      searchParams: {
        torrentid: torrent.id,
        id: torrent.movieId,
        action: 'description',
      },
    })
    return response.Description as string
  }

  async downloadTorrent(torrentId: number): Promise<Buffer> {
    const response = (await this.connection.getBuffer('torrents.php', {
      searchParams: { id: torrentId, action: 'download' },
      responseType: 'buffer',
    })) as Buffer
    return response
  }
}

export default Api

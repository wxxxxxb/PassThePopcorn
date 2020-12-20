import Connection from './connection'
import Movie from './objects/movie'
import Torrent from './objects/torrent'

interface SearchResult {
  Movies: Array<Record<string, any>>
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
    })) as unknown) as SearchResult
    return response.Movies.map(
      (movieData: Record<string, unknown>) => new Movie(movieData),
    )
  }

  async searchByImdbId(id: string): Promise<Movie> {
    return (await this.search(id))[0]
  }

  async getDescriptionForTorrent(torrent: Torrent): Promise<string> {
    const response = await this.connection.getJSON('torrents.php', {
      searchParams: {
        torrentid: torrent.id,
        id: torrent.movieId,
        action: 'description',
      },
    })
    console.log(response)
    return response.Description as string
  }
}

export default Api

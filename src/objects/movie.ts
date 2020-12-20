import Torrent from './torrent'
import Director from './director'

class Movie {
  id: number
  title: string
  year: string
  cover: string
  tags: string[]
  directors: Director[]
  imdbId: string
  totalLeechers: number
  totalSeeders: number
  totalSnatched: number
  maxSize: number
  lastUploadDate: Date
  // reasonsToTrump: string[]
  torrents: Torrent[]

  constructor(movieData: Record<string, any>) {
    this.id = movieData.GroupId
    this.title = movieData.Title
    this.year = movieData.Year
    this.cover = movieData.Cover
    this.tags = movieData.Tags
    this.directors = movieData.Directors?.map(
      (director: Record<string, string>) => new Director(director),
    )
    this.imdbId = `tt${movieData.ImdbId}`
    this.totalLeechers = movieData.TotalLeechers
    this.totalSeeders = movieData.TotalSeeders
    this.totalSnatched = movieData.TotalSnatched
    this.maxSize = movieData.MaxSize
    this.lastUploadDate = new Date(movieData.LastUploadTime)
    this.torrents = movieData.Torrents?.map(
      (torrent: Record<string, any>) => new Torrent(this.id, torrent),
    )
  }
}

export default Movie

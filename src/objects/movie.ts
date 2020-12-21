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
  imdbRating: string
  imdbVoteCount: number
  totalLeechers: number
  totalSeeders: number
  totalSnatched: number
  maxSize: number
  lastUploadDate: Date
  // reasonsToTrump: string[]
  torrents: Torrent[]

  constructor(movieData: Record<string, any>) {
    this.id = Number(movieData.GroupId)
    this.title = movieData.Title || movieData.Name
    this.year = movieData.Year
    this.cover = movieData.Cover || movieData.CoverImage
    this.tags = movieData.Tags
    this.directors = movieData.Directors?.map(
      (director: Record<string, string>) => new Director(director),
    )
    this.imdbId = `tt${movieData.ImdbId}`
    this.imdbRating = movieData.ImdbRating
    this.imdbVoteCount = movieData.ImdbVoteCount
    this.totalLeechers = movieData.TotalLeechers
    this.totalSeeders = movieData.TotalSeeders
    this.totalSnatched = movieData.TotalSnatched
    this.maxSize = movieData.MaxSize
    this.lastUploadDate =
      movieData.LastUploadTime && new Date(movieData.LastUploadTime)
    this.torrents = movieData.Torrents?.map(
      (torrent: Record<string, any>) => new Torrent(this.id, torrent),
    )
  }
}

export default Movie

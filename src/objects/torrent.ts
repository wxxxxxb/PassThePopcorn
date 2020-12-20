import Report from './report'
import Trumpable from './trumpable'

class Torrent {
  id: number
  movieId: number
  releaseName: string
  checked: boolean
  golden: boolean
  seeders: number
  size: number
  source: string
  container: string
  codec: string
  resolution: string
  quality: string
  uploadTime: Date
  trumpable: Trumpable[]
  reports: Report[]

  constructor(movieId: number, torrentData: Record<string, any>) {
    this.id = torrentData.Id
    this.movieId = movieId
    this.releaseName = torrentData.ReleaseName
    this.checked = torrentData.Checked
    this.golden = torrentData.GoldenPopcorn
    this.seeders = Number(torrentData.Seeders)
    this.size = Number(torrentData.Size)
    this.source = torrentData.Source
    this.container = torrentData.Container
    this.codec = torrentData.Codec
    this.resolution = torrentData.Resolution
    this.quality = torrentData.Quality
    this.uploadTime = new Date(torrentData.UploadTime)
    this.trumpable = torrentData.Trumpable?.map(
      (trumpable: Record<string, string>) => new Trumpable(trumpable),
    )
    this.reports = torrentData.Reports?.map(
      (reports: Record<string, string>) => new Report(reports),
    )
  }
}

export default Torrent

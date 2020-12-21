import Report from './report'
import Trumpable from './trumpable'

class Torrent {
  id: number
  infoHash: string
  movieId: number
  releaseName: string
  releaseGroup: string
  remasterTitle: string
  checked: boolean
  golden: boolean
  scene: boolean
  seeders: number
  leechers: number
  snatched: number
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
    this.id = Number(torrentData.Id)
    this.infoHash = torrentData.InfoHash
    this.movieId = movieId
    this.releaseName = torrentData.ReleaseName
    this.releaseGroup = torrentData.ReleaseGroup
    this.remasterTitle = torrentData.RemasterTitle
    this.checked = torrentData.Checked
    this.golden = torrentData.GoldenPopcorn
    this.scene = torrentData.Scene
    this.seeders = Number(torrentData.Seeders)
    this.leechers = Number(torrentData.Leechers)
    this.snatched = Number(torrentData.Snatched)
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

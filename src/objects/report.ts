class Report {
  type: string
  comment: string
  reportDate: Date

  constructor(reportData: Record<string, string>) {
    this.type = reportData.Type
    this.comment = reportData.Comment
    this.reportDate = new Date(reportData.ReportedTime)
  }
}

export default Report

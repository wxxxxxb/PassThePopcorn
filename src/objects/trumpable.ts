class Trumpable {
  id: number
  title: string
  description: string

  constructor(trumpableData: Record<string, string>) {
    this.id = Number(trumpableData.Id)
    this.title = trumpableData.Title
    this.description = trumpableData.Description
  }
}

export default Trumpable

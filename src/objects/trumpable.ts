class Trumpable {
  id: string
  title: string
  description: string

  constructor(trumpableData: Record<string, string>) {
    this.id = trumpableData.Id
    this.title = trumpableData.Title
    this.description = trumpableData.Description
  }
}

export default Trumpable

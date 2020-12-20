class Director {
  id: string
  name: string

  constructor(directorData: Record<string, string>) {
    this.id = directorData.Id
    this.name = directorData.Name
  }
}

export default Director

class Director {
  id: number
  name: string

  constructor(directorData: Record<string, string>) {
    this.id = Number(directorData.Id)
    this.name = directorData.Name
  }
}

export default Director

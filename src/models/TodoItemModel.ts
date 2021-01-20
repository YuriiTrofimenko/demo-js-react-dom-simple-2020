export default class TodoItemModel {
  public id: number
  public title: string
  public description: string
  public date: string
  public done: boolean
  constructor (title: string, description: string, date: string, id: number = 0, done: boolean = false) {
    this.id = id
    this.title = title
    this.description = description
    this.date = date
    this.done = done
  }
}
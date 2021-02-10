export default class TodoItemModel {
  public id: number
  public title: String
  public description: String
  public date: Date
  public done: boolean
  constructor (title: String, description: String, date: Date, id: number = 0, done: boolean = false) {
    this.id = id
    this.title = title
    this.description = description
    this.date = date
    this.done = done
  }
}
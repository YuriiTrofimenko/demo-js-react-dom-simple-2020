export default class TodoItemModel {
  private static lastId: number = 0
  public id: number
  public title: String
  public description: String
  public date: Date
  public done: Boolean
  constructor (title: String, description: String, date: Date, id: number = 0, done: Boolean = false) {
    if(!id || id === 0) {
      this.id = ++TodoItemModel.lastId
    } else {
      this.id = id
    }
    this.title = title
    this.description = description
    this.date = date
    this.done = done
  }
}
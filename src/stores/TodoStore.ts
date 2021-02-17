import {action, makeObservable, observable} from 'mobx'
import TodoItemModel from '../models/TodoItemModel'

class TodoStore {
  @observable todoList: TodoItemModel[] = []
  @observable currentTodo: TodoItemModel | null = null
  @observable todoTitle: String = ''
  @observable todoDescription: String = ''
  @observable todoDate: Date = new Date()
  @observable todoDone: Boolean = false

  // for MobX version 6
  constructor() {
      makeObservable(this)
  }

  @action fetchTodoList (): void {
    this.todoList.length = 0
    this.todoList.unshift(
      new TodoItemModel('t1', 'd1', new Date()),
      new TodoItemModel('t2', 'd2', new Date()),
      new TodoItemModel('t3', 'd3', new Date())
    )
  }
  @action setTodoTitle (title: String): void {
    this.todoTitle = title
  }
  @action setTodoDescription (description: String): void {
    this.todoDescription = description
  }
  @action setTodoDate (date: Date | null): void {
    console.log(date)
    this.todoDate = date || new Date()
  }
  @action setTodoDone (done: Boolean): void {
    this.todoDone = done
  }
  @action setCurrentTodo (id: number): void {
    this.currentTodo = this.todoList.find(todo => todo.id === id) ?? null
  }
  @action addTodoItem (): void {
    console.log('addTodoItem')
    this.todoList.unshift(
      new TodoItemModel(this.todoTitle, this.todoDescription, this.todoDate)
    )
  }
}

export { TodoStore }
export default new TodoStore()
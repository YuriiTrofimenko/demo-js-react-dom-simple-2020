import {action, makeObservable, observable} from 'mobx'
import TodoItemModel from '../models/TodoItemModel'
import FakeAPI from '../utils/FakeAPI'

class TodoStore {
  @observable todoList: TodoItemModel[] = []
  @observable currentTodoId: number | null = null
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
      ...FakeAPI.todoList
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
  @action setCurrentTodoId (id: number): void {
    this.currentTodoId = id
    const currentTodo =
        this.todoList.find(todo => todo.id === this.currentTodoId) ?? null
      if (currentTodo) {
        this.todoTitle = currentTodo.title
        this.todoDescription = currentTodo.description
        this.todoDate = currentTodo.date
        this.todoDone = currentTodo.done
      }
  }
  @action saveTodoItem (): void {
    // add a new item
    if(!this.currentTodoId) {
      FakeAPI.todoList.unshift(
        new TodoItemModel(this.todoTitle, this.todoDescription, this.todoDate)
      )
    } else {
      // edit selected item
      const currentTodo =
        FakeAPI.todoList.find(todo => todo.id === this.currentTodoId) ?? null
      if (currentTodo) {
        currentTodo.title = this.todoTitle
        currentTodo.description = this.todoDescription
        currentTodo.date = this.todoDate
        currentTodo.done = this.todoDone
      }
    }
    this.currentTodoId = null
    this.fetchTodoList()
  }
  /* @action editTodoItem (): void {
    if(this.currentTodo) {
      this.currentTodo =
        Object.assign(this.currentTodo, { done: this.todoDone })
    }
    console.log('this.currentTodo', this.currentTodo)
    console.log('this.todoList', this.todoList)
  } */
}

export { TodoStore }
export default new TodoStore()
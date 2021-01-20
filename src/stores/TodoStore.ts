import {action, observable} from 'mobx'
import TodoItemModel from '../models/TodoItemModel'

class TodoStore {
  @observable todoList: TodoItemModel[] = []
  @observable currentTodo: TodoItemModel | null = null
  @action fetchTodoList (): void {
    this.todoList.unshift(
      new TodoItemModel('t1', 'd1', '01.02.2021'),
      new TodoItemModel('t2', 'd2', '01.02.2021'),
      new TodoItemModel('t3', 'd3', '02.02.2021')
    )
  }
  @action addTodoItem (todoItem: TodoItemModel): void {
    this.todoList.unshift(todoItem)
  }
}

export { TodoStore }
export default new TodoStore()
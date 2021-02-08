import {inject, observer} from 'mobx-react'
import { Component } from 'react'
import TodoItemModel from '../../models/TodoItemModel'
import { TodoStore } from "../../stores/TodoStore"

interface IProps {
  todoStore: TodoStore
}

interface IState {
}

@inject('todoStore')
@observer
class TodoList extends Component<IProps, IState> {
  componentDidMount() {
    this.props.todoStore.fetchTodoList()
    setTimeout(() => {
      this.props.todoStore.addTodoItem(new TodoItemModel('t4', 'd4', '04.02.2021'))
    }, 2000)
  }
  render () {
    const {todoList} = this.props.todoStore
    return <ul>
      {
        todoList.map((todoItem, idx) => <li key={idx}>{todoItem.title}</li>)
      }
    </ul>
  }
}
export default TodoList 
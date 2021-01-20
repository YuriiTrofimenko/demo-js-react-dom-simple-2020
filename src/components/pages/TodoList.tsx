import {inject, observer} from 'mobx-react'
import { Component } from 'react'
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
  }
  render () {
    const {todoList} = this.props.todoStore
    return <ul>
      {
        todoList.map(todoItem => <li>{todoItem.title}</li>)
      }
    </ul>
  }
}
export default TodoList 
import StyledTodoList from "./StyledTodoList"
import todoStore from "../../stores/TodoStore"

const TodoList = () => {
  return <StyledTodoList todoStore={todoStore}/>
}
export default TodoList 
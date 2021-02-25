// import classes from '*.module.css'
import { WithStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography, CardActions, Button, Grid, IconButton, Fab, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import {inject, observer} from 'mobx-react'
import React, { Component } from 'react'
import { TodoStore } from "../../stores/TodoStore"
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import { KeyboardDatePicker } from "@material-ui/pickers"

interface IProps extends WithStyles<typeof styles> {
  todoStore: TodoStore
}

interface IState {
  todoDialogOpen: boolean
}

const styles = (theme: Theme) => createStyles({
  card: {
    minWidth: 275,
    minHeight: 167
  },
  newTaskCard: {
    backgroundColor: 'lightyellow'
  },
  completedTaskCard: {
    backgroundColor: 'lightgreen'
  },
  cardContent: {
    minWidth: 275,
    minHeight: 167,
    textAlign: 'center'
  },
  desktopCardActions: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  mobileCardActions: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  addCardCell: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  addCardFab: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    position: 'fixed',
    right: 16,
    bottom: 16,
    zIndex: 999
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

@inject('todoStore')
@observer
class StyledTodoList extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      todoDialogOpen: false
    }
  }
  componentDidMount() {
    this.props.todoStore.fetchTodoList()
    /* setTimeout(() => {
      this.props.todoStore.saveTodoItem(new TodoItemModel('t4', 'd4', '04.02.2021'))
    }, 2000) */
  }
  todoTitleChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.todoStore.setTodoTitle(e.target.value)
  }
  todoDescriptionChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.todoStore.setTodoDescription(e.target.value)
  }
  todoDateChangedHandler = (date: Date | null) => {
    this.props.todoStore.setTodoDate(date)
  }
  todoIsDoneChangedHandler = (todoItemId: number) => {
    this.props.todoStore.setCurrentTodoId(todoItemId)
    this.props.todoStore.setTodoDone(true)
    this.props.todoStore.saveTodoItem()
  }
  // открыть диалог добавления
  addTodoControlClickHandler = () => {
    this.setState({todoDialogOpen: true})
  }
  // открыть диалог редактирования
  startEditTodoHandler = (todoItemId: number) => {
    this.props.todoStore.setCurrentTodoId(todoItemId)
    this.setState({todoDialogOpen: true})
  }
  todoDialogCancelHandler = () => {
    this.setState({todoDialogOpen: false})
    this.props.todoStore.setCurrentTodoId(null)
  }
  todoDialogOkHandler = () => {
    this.props.todoStore.saveTodoItem()
    this.setState({todoDialogOpen: false})
  }
  todoDialogClosedHandler = () => {
    this.setState({todoDialogOpen: false})
    this.props.todoStore.setCurrentTodoId(null)
  }
  render () {
    const { classes } = this.props
    const { todoList, currentTodoId, todoTitle, todoDescription, todoDate } = this.props.todoStore
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.addCardCell}>
            <Card className={classes.cardContent} onClick={this.addTodoControlClickHandler}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Add a New ToDo
                </Typography>
                <IconButton href=''>
                    <AddIcon/>
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
          {
            todoList.map((todoItem, idx) => (
                <Grid item key={idx} xs={12} sm={6} lg={4} xl={3}>
                  <Card className={classes.card && (todoItem.done) ? classes.completedTaskCard : classes.newTaskCard}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {todoItem.title}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {todoItem.date.toLocaleDateString('ru-RU')}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {todoItem.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <div className={classes.desktopCardActions}>
                        <Button onClick={() => this.startEditTodoHandler(todoItem.id)} size="small">Edit</Button>
                        <Button onClick={() => this.todoIsDoneChangedHandler(todoItem.id)} size="small">Done</Button>
                      </div>
                      <div className={classes.mobileCardActions}>
                        <Button onClick={() => this.startEditTodoHandler(todoItem.id)} size="small"><EditIcon/></Button>
                        <Button onClick={() => this.todoIsDoneChangedHandler(todoItem.id)} size="small"><DoneIcon/></Button>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
            ))
          }
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.addCardFab}
          onClick={this.addTodoControlClickHandler}>
          <AddIcon />
        </Fab>
        <Dialog
          open={this.state.todoDialogOpen}
          onClose={this.todoDialogClosedHandler}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            {currentTodoId ? 'Edit Selected ToDo' : 'Add a New ToDo'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="titleInput"
              label="Title"
              type="text"
              fullWidth
              value={todoTitle}
              onChange={this.todoTitleChangedHandler}
            />
            <TextField
              autoFocus
              margin="dense"
              id="descriptionInput"
              label="Description"
              type="text"
              fullWidth
              value={todoDescription}
              onChange={this.todoDescriptionChangedHandler}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd/MM/yyyy"
                value={todoDate}
                onChange={this.todoDateChangedHandler}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.todoDialogCancelHandler} color="primary">
              Cancel
            </Button>
            <Button onClick={this.todoDialogOkHandler} color="primary">
              {currentTodoId ? 'Edit' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
export default withStyles(styles)(StyledTodoList)
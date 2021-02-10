// import classes from '*.module.css'
import { WithStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography, CardActions, Button, Grid, IconButton, Fab, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
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
  addTodoDialogOpen: boolean
}

const styles = (theme: Theme) => createStyles({
  card: {
    minWidth: 275,
    minHeight: 167
  },
  cardContent: {
    minWidth: 275,
    minHeight: 167,
    textAlign: 'center'
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
      addTodoDialogOpen: false
    }
  }
  componentDidMount() {
    this.props.todoStore.fetchTodoList()
    /* setTimeout(() => {
      this.props.todoStore.addTodoItem(new TodoItemModel('t4', 'd4', '04.02.2021'))
    }, 2000) */
  }
  todoTitleChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.todoStore.setTodoTitle(e.target.value)
  }
  todoDateChangedHandler = (date: Date | null) => {
    this.props.todoStore.setTodoDate(date)
  }
  // открыть диалог добавления
  addTodoControlClickHandler = () => {
    this.setState({addTodoDialogOpen: true})
  }
  addTodoDialogCancelHandler = () => {
    this.setState({addTodoDialogOpen: false})
  }
  addTodoDialogAddHandler = () => {
    this.props.todoStore.addTodoItem()
    this.setState({addTodoDialogOpen: false})
  }
  addTodoDialogClosedHandler = () => {
    this.setState({addTodoDialogOpen: false})
  }
  render () {
    const { classes } = this.props
    const {todoList} = this.props.todoStore
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
                  <Card className={classes.card}>
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
                      <Button size="small">Done</Button>
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
          open={this.state.addTodoDialogOpen}
          onClose={this.addTodoDialogClosedHandler}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a New Todo Item</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="titleInput"
              label="Title"
              type="text"
              fullWidth
              onChange={this.todoTitleChangedHandler}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd/MM/yyyy"
                value={this.props.todoStore.todoDate}
                onChange={this.todoDateChangedHandler}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.addTodoDialogCancelHandler} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addTodoDialogAddHandler} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
export default withStyles(styles)(StyledTodoList)
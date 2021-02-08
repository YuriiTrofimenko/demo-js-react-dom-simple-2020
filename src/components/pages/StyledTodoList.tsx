// import classes from '*.module.css'
import { WithStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core'
import {inject, observer} from 'mobx-react'
import React, { Component } from 'react'
import TodoItemModel from '../../models/TodoItemModel'
import { TodoStore } from "../../stores/TodoStore"

interface IProps extends WithStyles<typeof styles> {
  todoStore: TodoStore
}

interface IState {
}

const styles = (theme: Theme) => createStyles({
  root: {
    minWidth: 275,
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
  componentDidMount() {
    this.props.todoStore.fetchTodoList()
    setTimeout(() => {
      this.props.todoStore.addTodoItem(new TodoItemModel('t4', 'd4', '04.02.2021'))
    }, 2000)
  }
  render () {
    const { classes } = this.props
    const {todoList} = this.props.todoStore
    return <Grid container spacing={3}>
      {
        todoList.map((todoItem, idx) => (
            <Grid item key={idx} xs={12} sm={6} lg={4} xl={3}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {todoItem.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {todoItem.date}
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
  }
}
export default withStyles(styles)(StyledTodoList)
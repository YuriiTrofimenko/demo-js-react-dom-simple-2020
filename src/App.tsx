import React, {Component} from 'react'
import { BrowserRouter as Router, Route, /* Switch */ } from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'
import RouteModel from './models/RouteModel'
import Home from './components/pages/Home'
import About from './components/pages/About'
import TodoList from './components/pages/StyledTodoList'
import { AppBar, Container, Toolbar, Typography, withStyles, WithStyles, Theme, createStyles } from '@material-ui/core'
import AppBarCollapse from './components/common/AppBarCollapse'

interface IProps extends WithStyles<typeof styles> {}

interface IState {}

const styles = (theme: Theme) => createStyles({
      // объявление пользовательского класса стиля
      // (для корневого компонента разметки текущего компонента)
      root: {
          // атрибут класса стиля
          flexGrow: 1,
      },
      container: {
          maxWidth: '970px',
          '& .page' : {
              position: 'static'
          }
      },
      menuButton: {
          marginRight: theme.spacing(2),
      },
      title: {
          flexGrow: 1,
      },
      navBar: {
          color: '#fff',
          backgroundColor: '#ee6e73',
      },
      modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
      },
      modalContent: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
      },
      cartModalContent: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
      },
      closeButton: {
          cursor:'pointer',
          float:'right',
          marginTop: '-80px',
          marginRight: '-25px',
      }
  })

class App extends Component<IProps, IState> {

  render(){
    const { classes } = this.props
    const menuItemModels: Array<RouteModel> = [
      new RouteModel('/', 'Home', Home),
      new RouteModel('/todo-list', 'TodoList', TodoList),
      new RouteModel('/about', 'About', About)
    ]
    return (
      <>
        <Router>
          <div className={classes.root}>
            <AppBar position='sticky' className={classes.navBar}>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        SimpleReactSPA
                    </Typography>
                    <AppBarCollapse routes={menuItemModels} />
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" className={classes.container}>
                {menuItemModels.map(({ uri, Component }) => (
                    <Route key={uri} exact path={uri}>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={300}
                                classNames='page'
                                unmountOnExit
                            >
                                <div className='page'>
                                    <Component />
                                </div>
                            </CSSTransition>
                        )}
                    </Route>
                ))}
            </Container>
          </div>
        </Router>
      </>
    )
  }
}

export default withStyles(styles)(App)

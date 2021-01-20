import React, {Component} from 'react'
// import Nav from './components/common/Navbar'
// import Nav from './components/common/MaterialNavbar'
import { BrowserRouter as Router, Route, /* Switch */ } from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'
import RouteModel from './models/RouteModel'
import Home from './components/pages/Home'
import About from './components/pages/About'
import TodoList from './components/pages/TodoList'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import AppBarCollapse from './components/common/AppBarCollapse'

class App extends Component {
  render(){
    const menuItemModels: Array<RouteModel> = [
      new RouteModel('/', 'Home', Home),
      new RouteModel('/todo-list', 'TodoList', TodoList),
      new RouteModel('/about', 'About', About)
    ]
    return (
      <>
        <Router>
          {/* <Nav itemModels={menuItemModels}/>
          <Switch>
              {
                  menuItemModels.map(
                      (routeModel, idx) =>
                          <Route
                              key={idx}
                              exact
                              path={routeModel.uri}
                              component={routeModel.component}/>
                      )
              }
          </Switch> */}
          <div className={classes.root}>
            <AppBar position='sticky' className={classes.navBar}>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        SpringReactSPA
                    </Typography>
                    <AppBarCollapse routes={menuItemModels} userStore={this.props.userStore} />
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" className={classes.container}>
                {menuItemModels.map(({ uri, component }) => (
                    <Route key={uri} exact path={uri}>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={300}
                                classNames='page'
                                unmountOnExit
                            >
                                <div className='page'>
                                    <component />
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

export default App

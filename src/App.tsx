import {Component} from 'react'
import {Navbar as Nav} from './components/common/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RouteModel from './models/RouteModel'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Shopping from './components/pages/Shopping'

class App extends Component {
  render(){
    const menuItemModels: Array<RouteModel> = [
      new RouteModel('/', 'Home', Home),
      new RouteModel('/shopping', 'Shopping', Shopping),
      new RouteModel('/about', 'About', About)
    ]
    return (
      <>
        <Router>
          <Nav itemModels={menuItemModels}/>
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
          </Switch>
        </Router>
      </>
    )
  }
}

export default App

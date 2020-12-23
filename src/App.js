import {Component} from 'react'
import {Navbar as Nav} from './components/Navbar'

class App extends Component {
  render(){
    const menuItemModels = [
      {name: 'Home'},
      {name: 'Shopping'},
      {name: 'About'}
    ]
    return (
      <>
        <Nav itemModels={menuItemModels}/>
        <h1>'Hello React DOM (from class)'</h1>
        <p>Lorem ipsum</p>
      </>
    )
  }
}

export default App

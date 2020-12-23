import {Component} from 'react'

class Navbar extends Component {
  render () {
    const menuItemModels = this.props.itemModels
    const menuItems = (
      <ul>
        {
          menuItemModels.map(
            itemModel => <li>{itemModel.name}</li>
          )
        }
      </ul>
    )
    return (
      <nav>
        {menuItems}
      </nav>
    )
  }
}

export {Navbar}
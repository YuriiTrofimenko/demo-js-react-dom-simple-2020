import {Component} from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
  render () {
    const menuItemModels = this.props.itemModels
    const menuItems = (
      <ul>
        {
          menuItemModels.map(
            (itemModel, idx) => <li key={idx}>
              <NavLink
                  to={itemModel.uri}
                  exact>
                  {itemModel.name}
              </NavLink>
            </li>
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
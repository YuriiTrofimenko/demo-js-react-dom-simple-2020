import {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {WithStyles, withStyles} from '@material-ui/core'
import RouteModel from '../../models/RouteModel'

interface IProps extends WithStyles<typeof styles> {
  itemModels: Array<RouteModel>
}
interface IState {}

const styles = () => ({
  links: {
      listStyleType: 'none',
      margin: '0',
      padding: '0',
      overflow: 'hidden',
      backgroundColor: '#333',
      position: 'sticky' as 'sticky',
      top: '0',
  },
  link: {
      float: 'left' as 'left',
      '& a': {
          display: 'block',
          color: 'white',
          textAlign: 'center',
          padding: '14px 16px',
          textDecoration: 'none',
      },
      '& a:hover': {
          backgroundColor: '#111'
      },
      '& .active': {
          backgroundColor: '#4CAF50'
      },
  },
})

class Navbar extends Component<IProps, IState> {
  render () {
    const {classes} = this.props
    const menuItemModels = this.props.itemModels
    const menuItems = (
      <ul className={classes.links}>
        {
          menuItemModels.map(
            (itemModel, idx) => (
            <li key={idx} className={classes.link}>
              <NavLink
                  to={itemModel.uri}
                  exact>
                  {itemModel.name}
              </NavLink>
            </li>)
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

export default withStyles(styles)(Navbar)
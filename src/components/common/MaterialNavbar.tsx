import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {Drawer, IconButton, List, ListItem, ListItemText, Theme, Toolbar, WithStyles, withStyles} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import RouteModel from '../../models/RouteModel'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'

interface IProps extends WithStyles<typeof styles> {
  itemModels: Array<RouteModel>
}
interface IState {}

const drawerWidth = 240
const styles = (theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  }
})

class MaterialNavbar extends Component<IProps, IState> {
  render () {
    const {classes} = this.props
    const menuItemModels = this.props.itemModels
    return (
      <>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {}}
            edge="start"
            className={clsx(classes.menuButton, true && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
      </Toolbar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={true}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {
            menuItemModels.map(
              (itemModel, idx) => (
              <ListItem button key={idx}>
                <ListItemText>
                  <NavLink
                      to={itemModel.uri}
                      exact>
                      {itemModel.name}
                  </NavLink>
                </ListItemText>
              </ListItem>)
            )
          }
        </List>
      </Drawer>
      </>
    )
  }
}

export default withStyles(styles)(MaterialNavbar)
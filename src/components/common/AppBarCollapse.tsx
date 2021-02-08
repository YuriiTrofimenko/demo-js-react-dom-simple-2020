import React, {Component} from "react"
import { MenuItem } from "@material-ui/core"
import { WithStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles"
import ButtonAppBarCollapse from "./ButtonAppBarCollapse"
import { NavLink } from 'react-router-dom'
import RouteModel from "../../models/RouteModel"

interface IProps extends WithStyles<typeof styles> {
    routes: Array<RouteModel>
}

interface IState {
}

const styles = (theme: Theme) => createStyles({
  root: {
      position: "absolute",
      right: 0,
  },
  buttonBar: {
      [theme.breakpoints.down("xs")]: {
          display: "none"
      },
      margin: "10px",
      paddingLeft: "16px",
      right: "10px",
      position: "relative",
      width: "100%",
      background: "transparent",
      display: "inline"
  },
  buttonBarItem: {
      webkitTransition: 'background-color .3s',
      transition: 'background-color .3s',
      fontSize: '1rem',
      color: '#fff',
      padding: '15px',
      cursor: 'pointer',
      textDecoration: 'none'
  },
  buttonBarItemActive: {
      backgroundColor: '#ea454b',
  },
  mobileButtonBarItem: {
      textDecoration: 'none',
  },
  mobileButtonBarItemActive: {
      backgroundColor: '#ccc',
  }
})

class AppBarCollapse extends Component<IProps, IState> {

    render() {
        const { classes } = this.props
        const { routes } = this.props
        return (
            <div className={classes.root}>
                <ButtonAppBarCollapse>
                  {routes.map((route: RouteModel) => {
                    return <MenuItem key={route.uri}>
                        <NavLink
                            to={route.uri}
                            className={classes.mobileButtonBarItem}
                            activeClassName={classes.mobileButtonBarItemActive}
                            exact>
                            {route.name}
                        </NavLink>
                    </MenuItem>
                  })}
                </ButtonAppBarCollapse>
                <div className={classes.buttonBar} id="appbar-collapse">
                    {routes.map((route: RouteModel) => {
                      return <NavLink
                          key={route.uri}
                          to={route.uri}
                          // можно указать в двойных кавычках имя
                          // класса стиля, описанного в css
                          className={classes.buttonBarItem}
                          // , а в данном случае создается экранирование
                          // фигурными скобками, и внутри него
                          // указывается имя класса стиля,
                          // определенного в константе styles
                          activeClassName={classes.buttonBarItemActive}
                          exact>
                          {route.name}
                      </NavLink>
                    })}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(AppBarCollapse)
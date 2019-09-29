import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import NavList from './NavList'

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class NavBar extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      sidebar: false,
    };

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar() {
    this.setState({sidebar: !this.state.sidebar})
  }

  render() {
  const { classes } = this.props

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={this.toggleSidebar} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {this.props.page}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={this.state.sidebar} onClose={this.toggleSidebar}>
        <NavList />
      </Drawer>
    </div>
  );
  }
}

export default withStyles(useStyles)(NavBar)
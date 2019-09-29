import React, { Component } from 'react'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { withStyles } from '@material-ui/core/styles';
import DialpadIcon from '@material-ui/icons/Dialpad';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = theme => ({
  list: {
    width: 250,
  }
});

class NavList extends Component {
  
  constructor(props){
    super(props)

    this.iconSelector = this.iconSelector.bind(this)
    this.pathSelector = this.pathSelector.bind(this)
  }
  
  iconSelector = (index) => {
    switch(index) {
      case 0:
        return <HomeIcon />;
      case 1:
        return <LocalDiningIcon />;
      case 2:
        return <ShowChartIcon />;
      case 3:
        return <DialpadIcon />;
      default:
        return
    }
  }

  pathSelector = (index) => {
    switch(index){
      case 0:
        return '/home';
      case 1:
        return '/recommender';
      case 2:
        return '/tracker';
      case 3:
        return '/calculator';
      default:
        return
    }
  }

  render() {
    const { classes } = this.props

    return(
      <div
      className={classes.list}
      role="presentation"
      >
      <List>
        {['Home', 'Calorie recommender', 'Tracker', 'Calculator'].map((text, index) => (
          <ListItem button key={text} component="a" href={this.pathSelector(index)}>
            <ListItemIcon>
              {this.iconSelector(index)}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem button key={text} component="a" href="/">
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
    );
  }
}

export default withStyles(useStyles)(NavList)
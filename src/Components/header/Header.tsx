import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Menu, MenuItem } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';

// import Link from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center"
  },
  linkButton:
  {
    color: "white"
  },
  hide:
  {
    display: "none"
  },
  show: {
    display: "block"
  }
}));


const Header = (props: any) => {
  const classes = useStyles();
  const [displayFilterButton, setDisplayFilterButton] = useState<Boolean>(false);
  const [displayFilterComponent, setDisplayFilterComponent] = useState<Boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const [routeName,setRouteName]=useState('');
  // setDisplayFilterComponent(props.displayFilterComponent);
  if (props.displayFilterComponent !== displayFilterComponent) {
    setDisplayFilterComponent(props.displayFilterComponent);
  }
  let currentPage = () => {
    return window.location.pathname;
  }
  let page = currentPage();

  if (page.includes("dashboard")) {
    if (displayFilterButton !== true) {
      setDisplayFilterButton(true);
    }
  }
  else {
    if (displayFilterButton !== false) {
      setDisplayFilterButton(false);
    }
  }


  let filterOnClick = () => {
    setDisplayFilterComponent(!displayFilterComponent);
    props.filterButtonDisplayCallback(!displayFilterComponent);
    // console.info(displayFilterComponent);
  }

  return (
    <div className={classes.root}>
      <AppBar>
      
        <Toolbar>
        {(localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null) ?
          <Button className={classes.linkButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <ListRoundedIcon />
          </Button>:null}
          {(localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null) ?
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} ><Button id="dashboard" href="/dashboard" >Dashboard</Button></MenuItem>
            {displayFilterButton === true ? <MenuItem onClick={handleClose}><Button id="filter" onClick={filterOnClick} >Filter Dashboard<FilterListIcon /></Button></MenuItem> : null}
            <MenuItem onClick={handleClose}><Button id="readnow" href="/readnow" >Read Now</Button></MenuItem>
            {(localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) ?
              <MenuItem onClick={handleClose}><Button id="updateUserProfile" href="/register" >Update User Profile</Button></MenuItem> : null}
          </Menu>
          :null}
          <Typography variant="h6" className={classes.title}>
            Daily News!
    </Typography>
          {(localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null) ?
            <Button color="inherit" className={classes.linkButton} id="signout" onClick={() => {
              let token = localStorage.getItem("token");
              if (token !== undefined && token !== null) {
                localStorage.removeItem("token");
                window.location.replace('/login');
              }
            }}><PowerSettingsNewRoundedIcon /></Button>
            : null}

        </Toolbar>
      </AppBar>
    </div>);
}
export default Header;
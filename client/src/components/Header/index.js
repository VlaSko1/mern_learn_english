import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import pages from '../utils/pages';

import { headerHeight } from '../utils/sizes';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  navBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

}));



const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const classes = useStyles();
  let navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ flexGrow: 1, height: `${headerHeight}vh`, justifyContent: 'center' }}>
      <Container maxWidth="xl" >
        <Toolbar>
          <Link
            variant="h6"
            underline="none"
            component="button"
            sx={{ mr: 2, display: { xs: 'none', sm: 'none', md: 'none', lg: "flex", xl: 'flex', textTransform: "uppercase" } }}
            color="#fff"
            onClick={() => { navigate('/') }}
          >
            Learning English words
          </Link>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none'} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"

            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'block', md: 'block', lg: 'none', xl: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} >
                  <Link
                    variant="subtitle1"
                    underline="none"
                    component="button"
                    textAlign="center"
                    onClick={() => { navigate(`/${(page === 'Home' ? '' : page).toLowerCase().replace(/\s/g, '_')}`) }} >{page} </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link
            variant="h6"
            underline="none"
            component="button"
            sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'none', sm: 'flex', md: 'flex', lg: "none", xl: 'none', textTransform: "uppercase" } }}
            color="#fff"
            onClick={() => { navigate('/') }}
          >
            Learning English words
          </Link>
          <Link
            variant="subtitle1"
            underline="none"
            component="button"
            sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'flex', sm: 'none', md: 'none', textTransform: "uppercase", } }}
            color="#fff"
            onClick={() => { navigate('/') }}
          >
            LEW
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex'} }} className={classes.navBar}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => { navigate(`/${(page === 'Home' ? '' : page).toLowerCase().replace(/\s/g, '_')}`) }}
                sx={{ my: 0, color: 'white', display: 'block', textTransform: 'uppercase' }}
              >
                {page}
              </Button>
            ))}
          </Box>



          <Box mr={2} sx={{ display: { xs: 'inline', md: 'flex', } }}>
            <Button color="inherit" variant="outlined" onClick={() => { navigate('/login') }}>Log In</Button>
          </Box>
          <Box >
            <Button color="secondary" variant="contained" onClick={() => { navigate('/registration') }}>Sign Up</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
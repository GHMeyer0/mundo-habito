import CheckIcon from '@mui/icons-material/Check';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, CssBaseline, Fab, IconButton, styled, Toolbar } from "@mui/material";
import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import TinderGoalsModal from '../components/TinderGoalsModal';
type Props = {}


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const Main = (props: Props) => {
  const navigate = useNavigate();
  const [tinderOpen, setTinderOpen] = useState(false);


  return (
    <>
      <CssBaseline />
      <Outlet />
      <TinderGoalsModal
        open={tinderOpen}
        onClose={() => setTinderOpen(false)}
      />

      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton
            onClick={() => navigate({
              pathname: "/goals",
            })} color="inherit" >
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add"
            onClick={() => setTinderOpen(true)}

          >
            <CheckIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={() => {
            navigate({
              pathname: "/",
            })
          }} >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar >
    </>
  )
}

export default Main
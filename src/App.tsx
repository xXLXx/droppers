import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SportsTennis from '@mui/icons-material/SportsTennis';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Bracket from './Bracket';
import Profiles from './Profiles';
import './App.css';

function App() {
  const [value, setValue] = React.useState('bracket');

  return (
    <div className="App">
      <Box sx={{ pb: 7 }} >
        { value === 'profiles' ? <Profiles /> : null }
        { value === 'bracket' ? <Bracket /> : null }
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction value="profiles" label="Profiles" icon={<AccountCircle />} />
            <BottomNavigationAction value="bracket" label="Bracket" icon={<SportsTennis />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import { useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BuildList from './utils/BuildList';
import GetInventory from './utils/GetInventory';
import List from './components/List';

function WithTheme() {
  const theme = useTheme();
  const primaryText = theme.palette.text.primary;
  const primaryColor = theme.palette.primary.main;

  const [data, setData] = useState([]);

  const styles = {
    primaryText: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1, 2),
      color: primaryText,
    },
    primaryColor: {
      backgroundColor: primaryColor,
      padding: theme.spacing(1, 2),
      color: theme.palette.common.white,
    },
  };

  const updateProgress = (message, percent_complete) => {
    console.log(message);
  }

  const handleStart = async () => {
    const list = await new Promise((res, rej) => {
      GetInventory(1, updateProgress, {resolve: res, reject: rej});
    });
    const data = await new Promise((res, rej) => {
      BuildList(list, {resolve: res, reject: rej});
    });
    setData(data);
  }

  return (
    <div className="App">
      {!data.length ? 
      <Grid container direction="column" justify="center" alignItems="center" style={{height: '100vh'}}>
        <Button variant="contained" color="primary" onClick={handleStart}>START</Button>
      </Grid>
      :
      <List data={data} />
      }
    </div>
  );
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WithTheme />
    </ThemeProvider>
  );
}

export default App;

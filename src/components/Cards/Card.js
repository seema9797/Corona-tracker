import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
     backgroundColor: theme.palette.background.paper,
     textAlign:'center',
     padding:'20px'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
}));

export default function CountriesCard() {

   const[results,setResults]=useState("")
  useEffect(()=>{
   axios.get("https://disease.sh/v3/covid-19/countrie")
    .then(resp=>{
     setResults(resp.data);
    
    })
    .catch(err=>{
      console.log("err")
    })
  },[])
  const classes = useStyles();
  const Countries=results.map(data=>{
    return(
      <Grid container spacing={3}>
      <Grid item xs>
        <Paper className={classes.paper}>
        <List component="nav" className={classes.root} aria-label="mailbox folders">
  <ListItem button>
    <ListItemText>Cases{data.country}</ListItemText>
  </ListItem>
  <Divider />
  <ListItem button divider>
  <ListItemText>Recovered{data.recovered}</ListItemText>
  </ListItem>
  <ListItem button>
  <ListItemText>Today's Cases{data.todayCases}</ListItemText>
  </ListItem>
  <Divider light />
  <ListItem button>
  <ListItemText>Today's Death {data.deaths}</ListItemText>
  </ListItem>
  <ListItem button>
  <ListItemText>Active{data.active}</ListItemText>
  </ListItem>
  <ListItem button>
  <ListItemText>Critical{data.critical}</ListItemText>
  </ListItem>
</List>
        </Paper>
      </Grid>
   </Grid>
    )
  })
  }

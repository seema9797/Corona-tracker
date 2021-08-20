import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SnoozeOutlinedIcon from '@material-ui/icons/SnoozeOutlined';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import CardMedia from '@material-ui/core/CardMedia';
import Columns from 'react-columns';
import { green,red,grey } from '@material-ui/core/colors';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
     backgroundColor: theme.palette.background.paper,
     textAlign:'center',
     padding:'20px'
  },
  palette: {
    primary: {
      red: '#f44336',
      green: '#1b5e20',
      dark: '#757575',
      contrastText: '#fff',
    },
  inputbox:{
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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
  dark:{
    backgroundColor: 'black',
    color: '#fff'
  }
}
}));

export default function CovidTracker() {
  const[latest,setLatest]=useState([])
   const[results,setResults]=useState([])
   const[searchcountry,setSearchcountry]=useState("")
  useEffect(()=>{
    axios
    .all([
      axios.get("https://disease.sh/v3/covid-19/all"),
      axios.get("https://disease.sh/v3/covid-19/countries")
    ])
    .then(responseArr=>{
     setLatest(responseArr[0].data);
     setResults(responseArr[1].data)
    
    })
    .catch(err=>{
      console.log("err")
    })
  },[])
  const classes = useStyles();
  const date=new Date(parseInt(latest.updated))
  const lastUpdated=date.toString();
   const filterCountry=results.filter(item=>{
     return searchcountry!=="" ?item.country ===searchcountry: item;
   })
  const contries=filterCountry.map((data,i)=>{
return(
  <Grid container spacing={3}
  key={i}
  className="text-centered"
  text={"white"}
  style={{padding:"10px"}}
  >
  <Grid item xs={12}>
    <Paper className={classes.paper}>
    <List component="nav" className={classes.root} aria-label="mailbox folders">
    <ListItem>
    <CardMedia>
 <img src={data.countryInfo.flag} alt="recipe thumbnail"/>
</CardMedia>
     </ListItem> 
<ListItem button>
<ListItemText  variant="h5" component="h2">Cases: {data.country}</ListItemText>
</ListItem>
<Divider />
<ListItem button divider>
<ListItemText>Recovered: {data.recovered}</ListItemText>
</ListItem>
<Divider />
<ListItem button>
<ListItemText>Today's Cases: {data.todayCases}</ListItemText>
</ListItem>
<Divider />
<Divider light />
<ListItem button>
<ListItemText>Today's Death: {data.deaths}</ListItemText>
</ListItem>
<Divider />
<ListItem button>
<ListItemText>Active: {data.active}</ListItemText>
</ListItem>
<Divider />
<ListItem button>
<ListItemText>Critical: {data.critical}</ListItemText>
</ListItem>
</List>
    </Paper>
  </Grid>
</Grid>
)
  });
  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4} >
        <List className={classes.root}>
         <Paper className={classes.palette.dark}  style={{ backgroundColor: grey[500] }}>
         <Typography variant="h5" style={{padding:'10px'}} component="h2">
          Cases
        </Typography>
    
        <Typography variant="p" component="h2">
          {latest.cases}
        </Typography>
      <Divider component="li" variant="inset" />
     
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SnoozeOutlinedIcon style={{ color: grey[900] }}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Last Update" secondary={lastUpdated} />
      </ListItem>
      </Paper>
    </List>      
  </Grid>
  <Grid item xs={6} sm={4} >
        <List className={classes.root} >
         <Paper className={classes.paper} style={{ backgroundColor: red[500] }}>
         <Typography variant="h5" style={{padding:'10px'}} component="h2">
          Deaths
        </Typography>
    
        <Typography variant="p" component="h2">
          {latest.deaths}
        </Typography>
      <Divider component="li" variant="inset" />
     
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SnoozeOutlinedIcon style={{ color: red[500] }}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Last Update" secondary={lastUpdated} />
      </ListItem>
      </Paper>
    </List>      
  </Grid>
  <Grid item xs={6} sm={4} >
        <List className={classes.root}>
         <Paper className={classes.paper} style={{ backgroundColor: green[500] }}>
         <Typography variant="h5" style={{padding:'10px'}} component="h2">
          Recovered
        </Typography>
    
        <Typography variant="p" component="h2">
          {latest.recovered}
        </Typography>
      <Divider component="li" variant="inset" />
     
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SnoozeOutlinedIcon style={{ color: green[500] }}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Last Update" secondary={lastUpdated} />
      </ListItem>
      </Paper>
    </List>      
  </Grid>
        <Grid item xs={12}>
        <FormControl  fullWidth className={classes.inputbox} variant="outlined">
          <InputLabel htmlFor="outline-county">Country</InputLabel>
          <OutlinedInput
            id="outline-county"
             type="text"
              onChange={e=>setSearchcountry(e.target.value)}
            labelWidth={100}
          />
        </FormControl>
        </Grid>
      </Grid>
      <Columns queries={queries}>{contries}</Columns>
      
    </div>
  );
}

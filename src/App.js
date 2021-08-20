import React from 'react'
import "./App.css"
import Card from './components/Cards/Live-Result';
import Container from '@material-ui/core/Container';
function App() {
  return (
    <Container style={{textAlign:"center"}}>
      <div>
        <h1>Covid Live Tracker</h1>
        </div>
        <Card/>
    </Container>
  );
}

export default App;

import React from 'react';
import './App.css';
import Nav from './components/Nav'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import styled from 'styled-components'
import {Route} from 'react-router-dom'

function App() {
  return (
      <Container>
        <Nav/>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/dashboard">
          <Dashboard/>
        </Route>
      </Container>
  );
}

export default App;

const Container = styled.div`
  background: #111725;
  height: 100vh;
  color: #f1f1f1;
`;


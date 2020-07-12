import React, {useState} from 'react';
import './App.css';
import Nav from './components/Nav'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import FriendsList from './components/FriendsList'
import PrivateRoute from './components/PrivateRoute'
import styled from 'styled-components'
import {Route} from 'react-router-dom'

function App() {

  const [user, setUser] = useState({})
  const [currentFriend, setCurrentFriend] = useState(0);

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
          <Login setCurrentUser={setUser}/>
        </Route>
        {/* <Route path="/dashboard">
          <Dashboard user={user}/>
        </Route> */}
        <PrivateRoute path='/dashboard' component={()=> <Dashboard user={user} setUser={setUser} setCurrentFriend={setCurrentFriend}/>}/>
        <PrivateRoute path='/profile' component={()=> <Profile user={user} setUser={setUser}/>}/>
        <PrivateRoute path='/friend/:name' component={()=> <FriendsList currentFriend={currentFriend}/>}/>
      </Container>
  );
}

export default App;

const Container = styled.div`
  background: #111725;
  // height: 100vh;
  color: #f1f1f1;
`;


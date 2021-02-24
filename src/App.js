import React, { useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import User from './components/User';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  

  const postUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        console.log(res)
        setUsers([res.data, ...users])
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <Form postUser={postUser}/>
      <h2>Saved Users</h2>
      {
        users.map(user => {
          return <User user={user} />
        })
      }
    </div>
  );
}

export default App;

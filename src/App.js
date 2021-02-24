import React, { useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
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
      <h3>Saved Users</h3>
      {
        users.map(user => {
          return <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        })
      }
    </div>
  );
}

export default App;
